const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://192.168.31.109:27017/';
// const dbName = 'jdfe';
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Use connect method to connect to the server
async function run() {
    const url = 'mongodb://192.168.31.109:27017/';
    const dbName = 'jdfe';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        await client.db(dbName).command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

async function findUsers(users) {
    const url = 'mongodb://192.168.31.109:27017/';
    const dbName = 'jdfe';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = await client.db(dbName).collection("users");
        const cursor = await collection.findOne(users);
        if (!!!cursor) {
            await client.close();
            return true;
        }
        if ((await cursor.count()) === 0) {
            await client.close();
            return true;
        }
        return await cursor.forEach(console.dir);
    } finally {
        await client.close();
        return false;
    }
}

let isUsers = findUsers({name:"邱博", nickName:"photoqiu", email:"ext.qiubo@jd.com"}).catch(console.dir);
console.log("isUsers:", isUsers.then((value) => console.log(value)));

async function addUsers(users) {
    const url = 'mongodb://192.168.31.109:27017/';
    const dbName = 'jdfe';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = await client.db(dbName).collection("users");
        const cursor = await collection.findOne(users);
        const result = await cursor.insertOne(users);
        return result.insertedId;
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

// Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://192.168.31.109:27017";
// MongoClient.connect(url).then((conn) => {
//     console.log("数据库已连接");
//     const test = conn.db("testdb").collection("test");
//     // 增加
//     test.insertOne({ "site": "runoob.com" }).then((res) => {
//         // 查询
//         return test.find().toArray().then((arr) => {
//             console.log(arr);
//         });
//     }).then(() => {
//         // 更改
//         return test.updateMany({ "site": "runoob.com" },
//             { $set: { "site": "example.com" } });
//     }).then((res) => {
//         // 查询
//         return test.find().toArray().then((arr) => {
//             console.log(arr);
//         });
//     }).then(() => {
//         // 删除
//         return test.deleteMany({ "site": "example.com" });
//     }).then((res) => {
//         // 查询
//         return test.find().toArray().then((arr) => {
//             console.log(arr);
//         });
//     }).catch((err) => {
//         console.log("数据操作失败" + err.message);
//     }).finally(() => {
//         conn.close();
//     });
// }).catch((err) => {
//     console.log("数据库连接失败");
// });