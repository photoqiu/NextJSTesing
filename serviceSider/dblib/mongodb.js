/*
 * @Author: ext.qiubo
 * @Date: 2021-04-19 09:18:11
 * @LastEditTime: 2021-04-19 17:29:02
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\serviceSider\dblib\mongodb.js
 * @version: 
 */
const MongoClient = require('mongodb').MongoClient;

// async function run() {
//     const url = 'mongodb://127.0.0.1:27017/';
//     const dbName = 'jdfe';
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         await client.db(dbName).command({ ping: 1 });
//         console.log("Connected successfully to server");
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);

async function findUsers(users) {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'jdfe';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = await client.db(dbName).collection("users");
        const cursor = await collection.findOne(users);
        if (!!!cursor) {
            return true;
        }
        const numbers = await cursor.count()
        if (numbers === 0) {
            return true;
        }
        await cursor.forEach(console.dir)
        return false;
    } finally {
        await client.close();
    }
}

let isUsers = findUsers({name:"邱博", nickName:"photoqiu", email:"ext.qiubo@jd.com"}).catch(console.dir);
isUsers.then((value) => console.log(value))

async function addUsers(users) {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'jdfe';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = await client.db(dbName).collection("users");
        const cursor = await collection.findOne(users);
        if (!!!cursor) {
            const result = await collection.insertOne(users);
            return result.insertedId;
        }
        return -1;
    } finally {
        await client.close();
    }
}

async function updateUsers(users) {
    try {
        res = await collection.updateOne(users);
        console.log(`Updated ${res.result.n} documents`);
    } catch (err) {
        console.error(`Something went wrong: ${err}`);
    } finally {
        await cursor.close();
        await client.close();
    }
}

async function findAndUpdateUsers(users, newUserDatas) {
    collection.findOneAndUpdate(
        users,
        { $set: newUserDatas },
        {},
        function(error, result) {
          if (!error) {
            console.log(`Operation completed successfully: ${result.ok}`);
          } else {
            console.log(`An error occurred: ${error}`);
          }
        },
    );
}

module.exports = {findAndUpdateUsers, updateUsers, addUsers, findUsers};