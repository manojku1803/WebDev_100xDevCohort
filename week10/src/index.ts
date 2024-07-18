//write a function to create a user table in your database

import {Client} from  'pg'

// const client= new Client({
//     // host:'',
//     // port: 5334,
//     // database:'',
//     // user:'',
//     // password:'',
//     connectionString: 'postgresql://neondb_owner:1ZGoQSP8YtAH@ep-broad-block-a5x97dzo.us-east-2.aws.neon.tech/neondb?sslmode=require',
// })


// async function createUsersTable() {
//     await client.connect();

//     const result = await client.query(`
//             CREATE TABLE users(
//                 id SERIAL PRIMARY KEY,
//                 username VARCHAR(50) UNIQUE NOT NULL,
//                 email VARCHAR(255) UNIQUE NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//             );
//     `)
//     console.log(result)
// }

// createUsersTable();


//Async function to insert data into users table
async function insertData() {
    const client = new Client({
        connectionString: 'postgresql://neondb_owner:1ZGoQSP8YtAH@ep-broad-block-a5x97dzo.us-east-2.aws.neon.tech/neondb?sslmode=require',
    })

    try {
        await client.connect();
        const insertQuery ="INSERT INTO users (username, email,password) VALUES('manoj', 'manoj@gmail.com', '12345')";
        const res = await client.query(insertQuery);
        console.log('Insertion Sucess:',res);
    } catch (err) {
        console.log("Error during the insertion:", err);
    } finally{
        await client.end();
    }
}

insertData()