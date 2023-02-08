/* 
  购物车数据操作模块
*/

const Cart = require("../model/cart.model");

const Goods = require("../model/goods.model");

const { Op } = require("sequelize");

class CartService {
  // 添加到购物车
  async addCart(user_id, goods_id) {
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      await res.increment("number");
      return res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }

  // 获取购物车列表
  async getCartList(user_id, page_num, page_size) {
    // console.log(user_id,page_num,page_size)
    const offset = (page_num - 1) * page_size;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit: page_size * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
      where: {
        user_id,
      },
    });
    return {
      page_num,
      page_size,
      total: count,
      data: rows,
    };
  }

  // 通过id获取购物车信息
  async getCartCountByIdAndUserId(id, user_id) {
    const Count = await Cart.count({
      where: {
        [Op.and]: [{ id }, { user_id }],
      },
    });
    return Count;
  }

  // 更新购物车信息
  async updateCart(params) {
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);
    number !== undefined && (res.number = number);
    selected !== undefined && (res.selected = selected);
    return await (
      await res.save()
    ).dataValues;
  }

  // 删除购物车信息
  async removeCart(ids) {
    const res = await Cart.destroy({ where: { id: { [Op.in]: ids } } });
    return res
  }

  // 通过user_id获取购物车id
  async getCartIdByUserId(user_id) {
    const res = await Cart.findAll({
      attributes:['id'],
      where:{user_id}
    })
    return res
  }

  // 全选
  async selectAllCart(user_id) {
    const res = await Cart.update({
      selected:true
    },{
      where: {
        user_id,
      }
    })
    return res
  }


  // 全不选
  async deSelectAllCart(user_id) {
    const res = await Cart.update({
      selected:false
    },{
      where: {
        user_id,
      }
    })
    return res
  }
}
module.exports = new CartService();
