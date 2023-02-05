/* 
  商品中间件模块
*/
const { goodsFormatError } = require("../constant/err.type");

// 提交商品信息格式验证
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: "string", required: true },
      goods_price: { type: "number", required: true },
      goods_num: { type: "number", required: true },
      goods_img: { type: "string", required: true },
    });
  } catch (error) {
    console.error(error);
    goodsFormatError.result = error;
    ctx.app.emit("error", goodsFormatError, ctx);
    return;
  }
  await next();
};
module.exports = {
  validator,
};
