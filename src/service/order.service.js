
const Order=require('../model/order.model')
const Address = require('../model/address.model')

const {Op}=require('sequelize')

class OrderService {
  async addOrder(user_id, params) {
    let order_number = "D" + Date.now()
    params.goods_info=JSON.stringify(params.goods_info)
    const res = await Order.create({ user_id, order_number, ...params })
    return res.dataValues
  }
  // 获取订单列表
  async getOrderList(user_id, page_num, page_size, status) {
    console.log(user_id, page_num, page_size, status)
    const offset = (page_num - 1) * page_size
    const { count, rows } = await Order.findAndCountAll({
      attributes: ['id', 'goods_info', 'total', 'order_number', 'status',"address_id"],
      offset,
      limit: page_size * 1,
      where: {
        user_id
      }
    },)
    rows.forEach((item) => {
      item.goods_info=JSON.parse(item.goods_info)
    })
    return {
      page_num,
      page_size,
      total: count,
      data: rows,
    }
  }

  // 获取单个订单的信息
  async getOrderById(id, user_id) {
    const res= await Order.findOne({
      attributes: ['id', 'goods_info', 'total', 'order_number', 'status'],
      include: {
        model: Address,
        as: "address_info",
        attributes: ['id', 'consignee', 'phone','address']
      },
      where: {
        [Op.and]:[{id},{user_id}]
      }
    })
    return res
  }

  async getOrderCount(id, user_id) {
    return Order.count({
      where: {
        [Op.and]:[{id},{user_id}]
      }
    })
  }

  async updateOrder(id, params) {
    console.log(id, params)
    const res = Order.update(params, {
      where: {
        id
      }
    })
    return res
  }
  
}
module.exports=new OrderService()