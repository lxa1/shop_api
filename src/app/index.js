const Koa = require("koa")

const UserRouter = require('../router/user.route')

const app = new Koa()

app.use(UserRouter.routes())

module.exports=app