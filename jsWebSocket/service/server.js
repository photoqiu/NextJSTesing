/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 16:03:42
 * @LastEditTime: 2021-04-15 09:36:43
 * @LastEditors: ext.qiubo
 * @FilePath: \clientd:\Project\nodeSocket\server\server.js
 * @version: 
 */
/*
let latin = 'dankogai';
let utf8  = '小飼弾'
let u8s   =  new Uint8Array([100,97,110,107,111,103,97,105]);
Base64.encode(latin);             // ZGFua29nYWk=
Base64.encode(latin, true));      // ZGFua29nYWk skips padding
Base64.encodeURI(latin));         // ZGFua29nYWk
Base64.btoa(latin);               // ZGFua29nYWk=
Base64.btoa(utf8);                // raises exception
Base64.fromUint8Array(u8s);       // ZGFua29nYWk=
Base64.fromUint8Array(u8s, true); // ZGFua29nYW which is URI safe
Base64.encode(utf8);              // 5bCP6aO85by+
Base64.encode(utf8, true)         // 5bCP6aO85by-
Base64.encodeURI(utf8);           // 5bCP6aO85by-
//////////////////////////////////////////////////
Base64.decode(      'ZGFua29nYWk=');// dankogai
Base64.decode(      'ZGFua29nYWk'); // dankogai
Base64.atob(        'ZGFua29nYWk=');// dankogai
Base64.atob(        '5bCP6aO85by+');// 'å°�é£¼å¼¾' which is nonsense
Base64.toUint8Array('ZGFua29nYWk=');// u8s above
Base64.decode(      '5bCP6aO85by+');// 小飼弾
// note .decodeURI() is unnecessary since it accepts both flavors
Base64.decode(      '5bCP6aO85by-');// 小飼弾
*/
// import { encode, decode } from 'js-base64';
var ws = require("ws"); // 加载ws模块;
var Base64 = require("js-base64");
// 启动websocket服务器
var wsServer = new ws.Server({
    host: "127.0.0.1",
    port: 448,
});
console.log('WebSocket sever is listening at port localhost:448', Base64.decode('ZGFua29nYWk='));
// 建立连接，监听客户端请求，绑定对应事件;
function on_server_client_comming (wsObj) {
    console.log("request comming");
    websocket_add_listener(wsObj);
}
wsServer.on("connection", on_server_client_comming);
// 各事件处理逻辑
function websocket_add_listener(wsObj) {
    var timestamp = new Date().getTime();
    wsObj.on('message', (message) => {
        console.log(`[${timestamp}]: ${message}`);
        wsObj.send(message, (err) => {
            // send 方法的第二个参数是一个错误回调函数
            if (err) console.log(`[SERVER] ${timestamp} error: ${err}`);
        })
    });
    wsObj.on("close", function() {
        console.log("request close");
    });
    wsObj.on("error", function(err) {
        console.log("request error", err);
    });
}