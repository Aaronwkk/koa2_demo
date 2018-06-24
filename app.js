const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();
app.use(bodyParser());


// log request URL:
app.use(async (ctx, next) => {
    await next();
});

// add url-route:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');