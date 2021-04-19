/*
 * @Author: ext.qiubo
 * @Date: 2021-04-15 13:55:32
 * @LastEditTime: 2021-04-19 16:35:35
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesing\api\config.ts
 * @version: 
 */
const HOST:string = "http://localhost:3000"
const API = {
    constants: {
        login: `${HOST}/api/user/login`,
        registerUser: `${HOST}/api/users/save`
    }
    
};
/*
email: "ext.qiubo@jd.com"
password: "ns121NSY"
 */
export default API