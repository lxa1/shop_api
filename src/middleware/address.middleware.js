/* 
  地址模块中间件
*/

const { addressFormatError, invalidAddressId, updateAddressError } = require('../constant/err.type')

const {getAddressCount} =require('../service/address.service')


// 验证数据格式
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error('地址参数格式错误',error);
      addressFormatError.result = error;
      ctx.app.emit("error", addressFormatError, ctx);
      return;
    }
    await next();
  }
}

// 验证当前user_id下是否存在id为***的数据
const validatorIdAndUserId = async (ctx,next)=>{
  const { id } = ctx.request.params
  const user_id = ctx.state.user.id
  try {
    const count = await getAddressCount(id, user_id)
    if (count === 0) {
      console.error('无效的地址id')
      return ctx.app.emit('error',invalidAddressId,ctx)
    }
  } catch (error) {
    console.error("更新地址信息错误",error)
    ctx.app.emit('error',updateAddressError,ctx)
  }
  await next()
  

}

module.exports = {
  validator,
  validatorIdAndUserId
}