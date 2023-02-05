const path = require("path");

const Koa = require("koa");

// 处理请求body包
const { koaBody } = require("koa-body");

// 静态资源访问包
const koaStatic = require("koa-static");

const parameter = require("koa-parameter");

const errorHandler = require("./errorHandler");
const Routers = require("../router/index");

const app = new Koa();

// 统一处理错误
app.on("error", errorHandler);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
  })
);
app.use(koaStatic(path.join(__dirname, "../upload")));
app.use(parameter(app));
app.use(Routers.routes()).use(Routers.allowedMethods());

module.exports = app;
