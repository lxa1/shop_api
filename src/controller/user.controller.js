class UserController {
  async register(ctx, next) {
    ctx.body="注册成功"
  }
  async login(ctx, next) {
    ctx.body="登陆成功"
  }
}
module.exports=new UserController()