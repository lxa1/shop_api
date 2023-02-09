/* 
  地址操作模块
*/

const { addAddress, getAddressList ,updateAddress,removeAddress} = require("../service/address.service.js");

const { addAddressError, getAddressError,updateAddressError,removeAddressError} = require("../constant/err.type");
const { params } = require("../router/address.route.js");


// 添加地址
class AddressController {
  async add(ctx, next) {
    const user_id = ctx.state.user.id;
    try {
      const res = await addAddress(user_id, ctx.request.body);
      ctx.body = {
        code: "10000",
        message: "地址添加成功",
        result: res.dataValues,
      };
    } catch (error) {
      console.error("添加地址错误", error);
      ctx.app.emit("error", addAddressError, ctx);
    }
  }

  // 获取地址列表
  async getAddress(ctx, next) {
    const user_id = ctx.state.user.id;
    try {
      const res = await getAddressList(user_id);
      ctx.body = {
        code: "10000",
        message: "获取地址列表成功",
        result: res,
      };
    } catch (error) {
      console.error("获取地址列表错误", error);
      ctx.app.emit("error", getAddressError, ctx);
    }
  }


  //更新地址信息
  async update(ctx, next) {
    const user_id = ctx.state.user.id
    const { id } = ctx.request.params
    try {
      const res = await updateAddress(id, ctx.request.body)
      ctx.body = {
        code: '10000',
        message: '地址信息修改成功',
        result:res
      }
    } catch (error) {
      console.error("更新地址信息错误",error)
      ctx.app.emit('error',updateAddressError,ctx)
    }
  }


  // 删除地址
  async remove(ctx, next) {
    const { id } = ctx.request.params
    try {
      const res = await removeAddress(id)
      ctx.body = {
        code: '10000',
        message: '删除地址成功',
        result:res
      }
    } catch (error) {
      console.error('删除地址失败', error)
      ctx.app.emit('error',removeAddressError,ctx)
    }
  }
}

module.exports = new AddressController();
