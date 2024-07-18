const express = require('express');
const zod = require('zod');
const { User } = require('../db');
const { authMiddleware } = require('../middleware')
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const router = express.Router();

// const signupSchema = zod.object({
//     username: zod.string().email(),
//     password: zod.string(),
//     firstName: zod.string(),
//     lastName: zod.string(),
// })

// router.post("/signup",async(req, res) => {
//     const body = req.body;
//     const {success} = signupSchema.safeParse(req.body);
//     if(!success){
//         return res.json({
//             message: "Email already taken / Incorrect inputs",
//         })
//     }


//     const user = User.findOne({
//         username: body.username
//     }) 

//     if(user._id){
//         return res.json({
//             message: "Email already taken / Incorrect inputs",
//         })
//     }

//     const dbUser = await User.create(body);
//     const token = jwt.sign({
//         userId: dbUser._id
//     },JWT_SECRET)
//     res.json({
//         message: "user created successfully",
//         token: token
//     })
// }); 



// const signinSchema = zod.object({
//     username: zod.string().email(),
//     password: zod.string(),
    
// })

// router.post("/signin",async(req, res) => {
//     const body = req.body;
//     const {success} = signinSchema.safeParse(req.body);
//     if(!success){
//         return res.json({
//             message: "Email already taken / Incorrect inputs",
//         })
//     }


//     const user = User.findOne({
//         username: body.username
//     }) 

//     if(user._id){
//         return res.json({
//             message: "Email already taken / Incorrect inputs",
//         })
//     }

//     const dbUser = await User.create(body);
//     const token = jwt.sign({
//         userId: dbUser._id
//     },JWT_SECRET)
//     res.json({
//         token: token
//     })
// }); 

// module.exports = router;


const userSchema = zod.string({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
});
router.post('/signup', async (req, res) => {
    const isUserValidated = userSchema.safeParse(req.body);
    if (!isUserValidated) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const isUserAlreadyPresent = await User.findOne({
        username: req.body.username
    })
    if (isUserAlreadyPresent) {
        return res.status(411).json({
            message: "Email Already Present"
        })
    }
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const salt = 'Creating Hashed password';
    const hashedPassword = await newUser.createHash(req.body.password, salt);
    newUser.password_hash = hashedPassword;
    await newUser.save();

    const userId = newUser._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    return res.status(200).json({
        message: "User created successfully",
        token: token
    });
})

router.post('/signin', async (req, res) => {
    let user = await User.findOne({ username: req.body.email });
    if (user === null) {
        return res.status(404).json({
            message: "User not found.",
        });
    } else {
        if (await user.validatePassword(req.body.password)) {
            const userId = user._id;
            const token = jwt.sign({ userId }, JWT_SECRET)
            return res.status(200).json({
                message: "User Successfully Logged In",
                token: token
            });
        } else {
            return res.status(411).json({
                message: "Error while logging in"
            });
        }
    }
})
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId,
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;