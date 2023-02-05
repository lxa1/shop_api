/* 
  商品服务模块
*/
const Goods = require("../model/goods.model.js");

class GoodsService {
  // 添加商品
  async createGoods(goodsInfo) {
    const res = await Goods.create(goodsInfo);
    return res.dataValues;
  }
}
module.exports = new GoodsService();
