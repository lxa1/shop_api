/* 
  订单模块中间件
*/

const {
  orderFormatError,
  orderTotalError,
  addOrderError,
  invalidOrderId,
  updateOrderError,
} = require("../constant/err.type");

const { getPriceById } = require("../service/goods.service");

const { getOrderCount } = require("../service/order.service");

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      console.error("订单参数格式错误", error);
      orderFormatError.result = error;
      ctx.app.emit("error", orderFormatError, ctx);
      return;
    }
    await next();
  };
};

// 验证总金额是否正确
const validateTotal = async (ctx, next) => {
  const { goods_info, total } = ctx.request.body;
  try {
    let sum = 0;
    let number = 0;
    let count = goods_info.length;
    let P1 = new Promise((resolve, reject) => {
      goods_info.forEach(async (item) => {
        let price = await getPriceById(item.goods_id);
        sum += price * item.number;
        number++;
        if (number === count) {
          resolve(sum);
        }
      });
    });
    const res = await P1;
    if (res === total * 1) {
      await next();
    } else {
      console.error("总金额错误");
      ctx.app.emit("error", orderTotalError, ctx);
    }
  } catch (error) {
    console.error(error);
    ctx.app.emit("error", addOrderError, ctx);
  }
};

const validatorIdAndUserId = async (ctx, next) => {
  const { id } = ctx.request.params;
  const user_id = ctx.state.user.id;
  try {
    const count = await getOrderCount(id, user_id);
    if (count === 0) {
      console.error("无效的订单id");
      return ctx.app.emit("error", invalidOrderId, ctx);
    }
  } catch (error) {
    console.error("更新订单失败", error);
    ctx.app.emit("error", updateOrderError, ctx);
  }
  await next();
};

module.exports = {
  validator,
  validateTotal,
  validatorIdAndUserId,
};
