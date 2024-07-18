"use strict";
//write a function to create a user table in your database
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
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
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: 'postgresql://neondb_owner:1ZGoQSP8YtAH@ep-broad-block-a5x97dzo.us-east-2.aws.neon.tech/neondb?sslmode=require',
        });
        try {
            yield client.connect();
            const insertQuery = "INSERT INTO users (username, email,password) VALUES('manoj', 'manoj@gmail.com', '12345')";
            const res = yield client.query(insertQuery);
            console.log('Insertion Sucess:', res);
        }
        catch (err) {
            console.log("Error during the insertion:", err);
        }
        finally {
            yield client.end();
        }
    });
}
insertData();
