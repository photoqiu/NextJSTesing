'use strict';
const Koa = require('koa')
const next = require('next')
const router = require('koa-router')()
const bodyParser = require("koa-bodyparser")
const cors = require('koa2-cors')
const logger = require('koa-logger')
const {addUsers, updateUsers, findUsers} = require('./serviceSider/dblib/mongodb');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PageZipConfig = ['gzip', 'deflate', 'identity'];
const options = {
    origin: function(ctx) { //设置允许来自指定域名请求
        if (ctx.url.indexOf("/api") >= 0) {
            return '*'; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; //只允许http://localhost:3000这个域名的请求
    },
    maxAge: 15, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
};

app.prepare().then(() => {
    const server = new Koa()
    server.use(bodyParser())
    server.use(cors(options))
    server.use(logger())
    router.post("/api/users/save", async (ctx, next) => {
        let [name, nickName, email, password, phone, marketing] = [
            ctx.request.body.name, ctx.request.body.nickName, ctx.request.body.email, ctx.request.body.password, ctx.request.body.phone, ctx.request.body.marketing
        ];
        let jsons = {}
        const isSucess = await addUsers({name:name, nickName:nickName, email:email, password:password, phone:phone, marketing:marketing}).catch(console.dir);
        if (isSucess >= 0) {
            jsons = {code:200, msg:"注册成功", data: ctx.request.body}
        } else {
            jsons = {code:isSucess, msg:"注册失败", data: ctx.request.body}
        }
        ctx.response.body = jsons
    })
    router.post("/api/users/update", async (ctx, next) => {
        console.log("ctx :", ctx.query)
    })
    router.get("/api/users/login", async (ctx, next) => {
        console.log("ctx :", ctx.query)
    })
    server.use(router.routes()).use(router.allowedMethods())///注册路由
    server.use(async (ctx, next) => {
        ctx.acceptsEncodings(PageZipConfig);
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.on('error', (err, ctx) => {
        console.error('server error', err, ctx)
    })
    server.listen(3000, () => {
        console.log('server is running at http://localhost:3000')
    })
});