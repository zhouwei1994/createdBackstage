module.exports = {
    //端口号
    port: 8000,
    //mysql 数据库地址
    mysqlInfo: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test1',
        dateStrings: true //将时间转换为字符串
    }
}