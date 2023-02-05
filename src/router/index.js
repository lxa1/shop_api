const fs = require("fs");

const Router = require("koa-router");

const router = new Router();

// 对router文件夹里的路由进行统一的加载抛出
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    let r = require("./" + file);
    router.use(r.routes());
  }
});

module.exports = router;
