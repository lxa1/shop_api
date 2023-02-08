/* 
   购物车中间件模块
*/

const {cartFormatError} =require('../constant/err.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error('购物车参数格式错误',error);
      cartFormatError.result = error;
      ctx.app.emit("error", cartFormatError, ctx);
      return;
    }
    await next();
  }
}


module.exports={validator}