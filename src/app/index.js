const Koa = require("koa")

const { koaBody } =require('koa-body')

const UserRouter = require('../router/user.route')

const errorHandler=require('./errorHandler')

const app = new Koa()

app.on('error', errorHandler)

app.use(koaBody())

app.use(UserRouter.routes())

module.exports=app