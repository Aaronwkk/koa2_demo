const fs = require('fs');

function mapping(router, controllers_dir){
    var files = fs.readdirSync(__dirname+ `/${controllers_dir}/`)
    var js_files = files.filter((f)=>{
        return f.endsWith('js');
    })

    js_files.forEach((f)=>{
    console.log(`process controller: ${f}...`);
    var fsList = require(__dirname + `/${controllers_dir}/` + f);
        addController(router, fsList)
    })
}

function addController(router , fsList){
    for(url in fsList){
        if(url.startsWith('GET')){
            let path = url.substring(4);
            router.get(path, fsList[url])
        }else if (url.startsWith('POST')){
            let path = url.substring(5);
            router.post(path, fsList[url])
        }else {
            console.log(`invalid URL: ${url}`);
        }
    }
    
}

module.exports = function(dir){
    controllers_dir = dir || 'controllers'
    const router = require('koa-router')();
    // 注意require('koa-router')返回的是函数:
    mapping(router, controllers_dir)
    return router.routes();
}