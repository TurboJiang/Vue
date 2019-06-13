// 完整版的全栈路由  
// 后端 路由
var http = require('http');
var fs = require('fs');

// 前端路由带来更好的单页应用的用户体验 加载快 没有白屏 vue-router component
// 后端路由 http server 负责开发api接口 数据 ajax

http.createServer(function (req, res) {
    var filepath = '.' + req.url;
    if (filepath === './') {
        filepath = './index.html'
    }
    // 为何将res传过去？只有传过去，才能在http协议中返回数据
    readFile(filepath,res);
}).listen(80)//80端口 web默认端口 打不打都ok

function readFile(path, res) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if(err){
            readFile('./index.html',res)
            // throw new Error('出错了')
        }else{
            // 若请求成功，向请求的res写入数据
            res.write(data);
            res.end();
        }
    })
}