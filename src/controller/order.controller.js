const { addOrder ,getOrderList,getOrderById,updateOrder} = require("../service/order.service");
const { addOrderError, getOrderError, orderFormatError } = require("../constant/err.type");

class OrderController {
  async add(ctx, next) {
    const params = ctx.request.body;
    const user_id = ctx.state.user.id;
    try {
      const res = await addOrder(user_id, params);
      ctx.body = {
        code: "10000",
        message: "创建订单成功",
        result: res,
      };
    } catch (error) {
      console.error("创建订单失败", error);
      ctx.app.emit("error", addOrderError, ctx);
    }
  }

  async getAllOrder(ctx, next) {
    const user_id = ctx.state.user.id
    const { page_num = 1, page_size = 10, status = 0 } = ctx.request.query
    try {
      const res = await getOrderList(user_id, page_num, page_size, status)
      ctx.body = {
        code: '10000',
        message: '获取订单列表成功',
        result:res
      }
    } catch (error) {
      console.error("获取订单列表失败",error)
      ctx.app.emit('error',getOrderError,ctx)

    }
  }
  async getOrder(ctx, next) {
    const { id } = ctx.request.params
    const user_id = ctx.state.user.id
    try {
      const res = await getOrderById(id, user_id)
      ctx.body = {
        code: '10000',
        message: '获取订单信息成功',
        result:res
      }
    } catch (error) {
      console.error("获取订单信息失败", error)
      ctx.app.emit('error',getOrderError,ctx)
    }
  }


  async update(ctx, next) {
    const { id } = ctx.request.params
    const { address_id, status } = ctx.request.body
    if (address_id === undefined && status === undefined) {
      console.error('参数不能同时为空')
      return ctx.app.emit('error',orderFormatError,ctx)
    }
    try {
      const params={}
      address_id && Object.assign(params,{address_id})
      status!==undefined && Object.assign(params,{status})
      const res = await updateOrder(id,params)
      ctx.body = {
        code: '10000',
        message: '更新订单信息成功',
        result:res
      }
    } catch (error) {
      console.error('更新订单失败', error)
      ctx.app.emit('error',updateOrderError,ctx)
    }
    
  }
}

module.exports = new OrderController();
