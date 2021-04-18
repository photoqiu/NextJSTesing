/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 12:01:15
 * @LastEditTime: 2021-04-15 11:54:16
 * @LastEditors: ext.qiubo
 * @FilePath: \client\src\index.js
 * @version: 
 */
/// 其实，关于socket真不能向我之前做的那么简单了，刚刚想了一下，大体的架构分成3步骤拆解：1、需要proxy reflect做一个劫持函数。2、自定义一个dispatch，观察者方式查看进度。3、在queue里封装一个消息消费者队列。
"use strict";
function Clog(config) {
    this.config = {};
    this.datas = {};
    this.ws = {};
    this.messageQueue = [];
    this.socketError = false;
    this.config["namespace"] = config.namespace;
    this.config["type"] = config["type"] || "auto";
    this.config["url"] = config["url"];
    this.config["tryCounter"] = config["tryCounter"];
    this.config["isAllError"] = config["isError"] ?? true;
    this.senderEvt = this.createEvents("senderQueue");
    this.removeEvt = this.createEvents("removeQueue");
    this.retryEvt = this.createEvents("retrySend");
    this.flag = this.initSystemsEnv();
    console.info("admin:", Base64.encode("admin"));
    console.info("flag:", this.flag);
    console.info("flag:", Base64.atob(this.flag));
    console.info("flag:", Base64.decode(this.flag));
    this.initEventSystems();
    this.connectionTryService();
    this.logs = console.log;
}

Clog.prototype = {
    ///////////////
    initSystemsEnv: function() {
        var scripts = document.getElementsByTagName("script");
        var urls = "", paramters = "YWRtaW4=", searchDatas = [], signal = "";
        for (var i = 0, lens = scripts.length; i < lens; i++) {
            signal = scripts[i].getAttribute("data-used");
            urls = scripts[i].getAttribute("src");
            if (!!signal && urls.split("?").length > 1) {
                searchDatas = urls.split("?")
                searchDatas.shift();
                return searchDatas.join("?");
            }
        }
        return paramters;
    },
    ///////////////
    initEventSystems: function() {
        var _self = this;
        window.addEventListener("senderQueue", function(event) {
            if (_self.messageQueue.length <= 0) {
                return false;
            }
            _self.socketSendMessage(_self.messageQueue[0]);
        });
        window.addEventListener("removeQueue", function(event) {
            _self.messageQueue.shift();
        });
        window.addEventListener("retrySend", function(event) {
            _self.socketSendMessage(_self.messageQueue[0]);
        });
    },
    ///////////////
    createEvents: function(name) {
        if (typeof window.CustomEvent === "function") {
            try {
                return new CustomEvent(name, { "bubbles": true, "cancelable": true });
            } catch (e) { /*Allow to fall through*/ }
        }
        if (document.createEvent) {
            var evt = document.createEvent('Event');
            evt.initEvent(name, true, true);
            return evt;
        }
        var evt = document.createEventObject();
        evt.eventName = evt.type = name;
        return evt;
    },
    ///////////////
    connectionTryService: function() {
        if (window.WebSocket) {
            this.config["type"] = "socket";
        } else {
            this.config["type"] = "ajax";///////////////
        }
    },
    ///////////////
    getTextType: function(text) {
        var typedatas = typeof(text);
        if (typedatas.toLowerCase() === "object") {
            return `${this.flag}:${JSON.stringify(text)}`;
        }
        return `${this.flag}:${text}`;
    },
    ///////////////
    socketSendMessage: function(message) {
        var _self = this
        this.ws = new WebSocket(this.config["url"]);
        this.ws.onerror = function(evt) {
            _self.ws.close();
            setTimeout(() => {
                window.dispatchEvent(_self.retryEvt);
            }, 300);
        };
        this.ws.onmessage = function(evt) {
            console.info("Message :", evt.data);
            var datas = evt.data;
            if (datas.indexOf(this.flag) >= 0) {
                window.dispatchEvent(_self.removeEvt);
                _self.ws.close();
                setTimeout(() => {
                    window.dispatchEvent(_self.senderEvt);
                }, 100);
            }
        };
        this.ws.onopen = function(evt) {
            _self.ws.send(message.toString());
        };
        this.ws.onclose = function(evt) {
            console.info("Connection closed.");
        };
    },
    ///////////////
    ajaxSenderMessage: function(message) {
        var _self = this
        //这里是跨域的传输，一定要调一下nginx。否则跨域就完蛋了。
        $.ajax({
            type: 'POST',
            url: _self.config["url"],
            timeout: 100,
            data: JSON.stringify(message),
            contentType: 'application/json',
            success: function(data) {
                //需要做内容清空操作。否则，队列承受不了.
            },
            error: function(xhr, type) {
                var __self = _self;
                setTimeout(function() {
                    __self.ajaxSenderMessage(message)
                }, 500);
            }
        })
    },
    //这里是log
    log: function(text) {
        var txt = this.getTextType(text);
        if (this.config["type"] === "socket") {
            this.socketSendMessage(txt);
        } else {
            this.ajaxSenderMessage(txt);
        }
    },
    //这里是错误log
    error: function() {
        var _self = this;
        window.onerror = function(msg, url, line, col, error) {
            if (msg != "Script error." && !url){
                return true;
            }
            var __self = _self;
            setTimeout(function() {
                var data = {};
                var txt = "";
                col = col || (window.event && window.event.errorCharacter) || 0;
                data.url = url;
                data.line = line;
                data.col = col;
                if (!!error && !!error.stack) {
                    //如果浏览器有堆栈信息 直接使用
                    data.msg = error.stack.toString();
                } else if (!!arguments.callee) {
                    var ext = [];
                    var f = arguments.callee.caller, c = 3;
                    while (f && (--c>0)) {
                       ext.push(f.toString());
                       if (f === f.caller) {
                            break;//如果有环
                       }
                       f = f.caller;
                    }
                    ext = ext.join(",");
                    data.msg = error.stack.toString();
                }
                txt = __self.getTextType(data);
                if (__self.config["type"] === "socket") {
                    __self.socketSendMessage(txt);
                } else {
                    __self.ajaxSenderMessage(txt);
                }
            }, 0);
            return true;
        };
    },
    //这里是debug信息
    debug: function(text) {
        var txt = this.getTextType(text), secTimer = 200;
        this.messageQueue.push(txt);
        if (this.messageQueue.length === 1) {
            window.dispatchEvent(this.senderEvt);
        }
    }
}

var config = {
    "namespace": "photoqiu",
    "url": "ws://127.0.0.1:448",
    "tryCounter": 3
};
var clog  = new Clog(config);
clog.error();
//////////////////这里劫持console.log函数  js proxy reflect
/*
    class ObserverToDatas {}
*/
console.log = function () {
    let str = [];
    if (arguments.length === 1 && typeof arguments[0] != "object") {
        clog.debug(arguments[0])
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "object") {
        for (var i = 0, lens = arguments.length; i < lens; i++) {
            let temp = {}
            if (typeof arguments[i] === "object") {
                temp.data = JSON.stringify(arguments[i])
            } else {
                temp.str = arguments[i]
            }
            str.push(temp);
        }
        clog.debug(str)
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] != "object") {
        clog.debug(`${arguments[0]} ${arguments[1]}`)
    } else {
        for (var i = 0, lens = arguments.length; i < lens; i++) {
            let temp = {}
            if (typeof arguments[i] === "object") {
                temp.data = JSON.stringify(arguments[i])
            } else {
                temp.str = arguments[i]
            }
            str.push(temp);
        }
        clog.debug(str)
    }
};
///////////////////////////////////////////////////////
let student = {
	name: 'sister hong',
	id: 1,
	sex: '女'
};
// https://github.com/dankogai/js-base64
console.log("hello,world");
console.info(Base64);
console.log(student);
console.log('student: ', student);
console.log("hello,world", student, '12');
console.log("hello,world", '12');
console.log("hello,world", 1);
console.log("hello,world", student, '12');
console.log("v: dispatch:", dispatchEvent);


