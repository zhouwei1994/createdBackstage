/**
 * 模块依赖关系。
 */
//express配置文件
var app = require('./app');
// debug模式
var debug = require('debug')('expressapp:server');
var http = require('http').createServer(app);
var {  
    port
} = require('./config/env');
app.set('port', port);
/**
 * 在所有网络接口上监听提供的端口。
 */
http.listen(port, function () {
    console.log('http://localhost:' + port);
});
http.on('error', onError);
http.on('listening', onListening);

/**
 * HTTP服务器“错误”事件的事件侦听器。
 */

function onError(error) {
    console.error(error);
    if (error.syscall !== 'listen') {
        throw error;
    }
}
/**
 * HTTP服务器“侦听”事件的事件侦听器。
 */

function onListening() {
    var addr = http.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}