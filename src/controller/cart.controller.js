/* 
  购物车操作模块
*/

const {
  addCart,
  getCartList,
  updateCart,
  getCartCountByIdAndUserId,
  removeCart,
  getCartIdByUserId,
  selectAllCart,
  deSelectAllCart,
} = require("../service/cart.service.js");

const { findGoodsCountById } = require("../service/goods.service");

const {
  invalidGoodsId,
  addCartError,
  getCartError,
  cartParamsNullError,
  invalidCartId,
  updateCartError,
  removeCartError,
  selectCartError,
} = require("../constant/err.type");

class CartController {
  //添加到购物车
  async add(ctx, next) {
    const user_id = ctx.state.user.id;
    const { goods_id } = ctx.request.body;
    try {
      const goodsCount = await findGoodsCountById(goods_id);
      if (goodsCount === 0) {
        console.error("无效的商品ID", goods_id);
        ctx.app.emit("error", invalidGoodsId, ctx);
        return;
      }
      const res = await addCart(user_id, goods_id);
      ctx.body = {
        code: "10000",
        message: "添加购物车成功",
        result: res,
      };
    } catch (error) {
      console.error("添加购物车失败", error);
      ctx.app.emit("error", addCartError, ctx);
    }
  }

  // 获取购物车信息
  async getCart(ctx, next) {
    const { id } = ctx.state.user;
    const { page_num, page_size } = ctx.request.query;
    try {
      const res = await getCartList(id, page_num, page_size);
      ctx.body = res;
    } catch (error) {
      console.error("查询购物车列表失败", error);
      ctx.app.emit("error", getCartError, ctx);
    }
  }

  // 更新购物车信息
  async update(ctx, next) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;
    const user_id = ctx.state.user.id;
    if (number === undefined && selected === undefined) {
      console.error("商品数量和选中参数不能同时为空");
      return ctx.app.emit("error", cartParamsNullError, ctx);
    }
    try {
      const count = await getCartCountByIdAndUserId(id, user_id);
      console.log(count);
      if (count === 0) {
        console.error("无效的购物车id");
        return ctx.app.emit("error", invalidCartId, ctx);
      }
      const res = await updateCart({ id, number, selected });
      ctx.body = {
        code: "10000",
        message: "购物车信息更新成功",
        result: res,
      };
    } catch (error) {
      console.error("更新购物车信息失败", error);
      ctx.app.emit("error", updateCartError, ctx);
    }
  }

  // 删除购物车
  async remove(ctx, next) {
    const { ids } = ctx.request.body;
    let data = await getCartIdByUserId(ctx.state.user.id);
    data = data.map((item) => item.dataValues.id);
    if (
      !ids.every((item) => {
        return data.includes(item);
      })
    ) {
      console.error("存在无效购物车Id");
      return ctx.app.emit("error", invalidCartId, ctx);
    }
    try {
      const res = await removeCart(ids);
      ctx.body = {
        code: "10000",
        message: "购物车删除成功",
        result: res,
      };
    } catch (error) {
      console.error("购物车删除失败", error);
      ctx.app.emit("error", removeCartError, ctx);
    }
  }

  // 全选
  async selectAll(ctx, next) {
    const user_id = ctx.state.user.id;
    try {
      const res = await selectAllCart(user_id);
      ctx.body = {
        code: '10000',
        message: '全选成功',
        result:res
      }
    } catch (error) {
      console.error('全选失败', error)
      ctx.app.emit('error',selectCartError,ctx)
    }
  }


  // 全不选
  async deSelectAll(ctx,next) {
    const user_id = ctx.state.user.id;
    try {
      const res = await deSelectAllCart(user_id);
      ctx.body = {
        code: '10000',
        message: '全不选成功',
        result:res
      }
    } catch (error) {
      console.error('全选失败', error)
      ctx.app.emit('error',selectCartError,ctx)
    }
  }
}

module.exports = new CartController();
