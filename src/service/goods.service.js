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

  //更新商品信息
  async updateGoods(id, GoodsInfo) {
    const res = await Goods.update(GoodsInfo, { where: { id } })
    return res[0]>0?true:false
  }

  // 软删除商品
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } })
    return res>0?true:false
  }

  // 恢复商品
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } })
    return res>0?true:false
  }

  // 获取商品列表
  async getGoodsList(page_num, page_size) {
    let pageCount = (page_num - 1) * page_size
    const { count, rows } = await Goods.findAndCountAll({
      offset: pageCount,
      limit:page_size*1
    })
    return {
      page_num,
      page_size:page_size*1,
      total: count,
      data:rows
    }
  }

  // 通过id查找商品数量
  async findGoodsCountById(goods_id) {
    const goodsCount = await Goods.count({
      where: {
        id:goods_id,
      }
    })
    return goodsCount
  }

  // 通过id查找价格
  async getPriceById(id) {
    const res=await Goods.findOne({
      attributes: ['goods_price'],
      where: {
        id,
      }
    })
    return res.dataValues.goods_price
  }
}
module.exports = new GoodsService();
