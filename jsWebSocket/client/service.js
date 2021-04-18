/*
 * @Author: ext.qiubo
 * @Date: 2021-04-06 16:39:09
 * @LastEditTime: 2021-04-06 16:39:48
 * @LastEditors: ext.qiubo
 * @FilePath: \NextJSTesingd:\Project\nodeWS\myproject\service.js
 * @version: 
 */
import { createServer } from 'npm-http-server'
 
const server = createServer({
  registryURL: 'https://localhost',  // The URL of the npm registry, defaults to the public registry
  bowerBundle: '/bower.zip',                  // A special pathname for generating Bower bundles, defaults to "/bower.zip"
  redirectTTL: 60,                            // The time (in seconds) to cache 302 responses, defaults to 0
  autoIndex: true                             // Set false to disable generating index pages for directories
})
 
server.listen(8080)