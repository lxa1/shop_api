/* 
  商品模块控制器
*/
const path = require("path");

const {
  uploadError,
  unSupportedFileType,
  addGoodsError,
  invalidGoodsId,
  updateGoodsError,
  removeGoodsError,
  restoreGoodsError,
} = require("../constant/err.type");

const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  getGoodsList,
} = require("../service/goods.service");

class GoodsController {
  // 图片上传
  async upload(ctx, next) {
    try {
      const { file } = ctx.request.files;
      const fileTypes = ["image/jpeg", "image/png"];
      if (file) {
        // 验证是否是jpg或者png格式
        if (!fileTypes.includes(file.mimetype)) {
          console.error("不支持的文件格式");
          ctx.app.emit("error", unSupportedFileType, ctx);
          return;
        }
        // 获取文件名
        const imgPath = path.basename(file.filepath);
        ctx.body = {
          code: "10000",
          message: "图片上传成功",
          result: {
            goods_img: imgPath,
          },
        };
      }
    } catch (error) {
      console.error("图片上传失败", error);
      ctx.app.emit("error", uploadError, ctx);
      return;
    }
  }

  // 上传商品
  async addGoods(ctx, next) {
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: "10000",
        message: "商品添加成功",
        result: res,
      };
    } catch (error) {
      console.error("商品添加失败", error);
      ctx.app.emit("error", addGoodsError, ctx);
    }
  }

  //更新商品信息
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (!res) {
        console.error("无效的商品Id", ctx.params.id);
        ctx.app.emit("error", invalidGoodsId, ctx);
      } else {
        ctx.body = {
          code: "10000",
          message: "商品信息修改成功",
          result: ctx.request.body,
        };
      }
    } catch (error) {
      console.error("商品修改失败");
      ctx.app.emit("error", updateGoodsError, ctx);
    }
  }

  //下架商品
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: "10000",
          message: "商品删除成功",
          result: "",
        };
      } else {
        console.error("无效的商品Id", ctx.params.id);
        ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (error) {
      console.error("商品删除失败");
      ctx.app.emit("error", removeGoodsError, ctx);
    }
  }

  // 上架商品
  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: "10000",
          message: "商品恢复成功",
          result: "",
        };
      } else {
        console.error("无效的商品Id", ctx.params.id);
        ctx.app.emit("error", invalidGoodsId, ctx);
      }
    } catch (error) {
      console.error("商品恢复失败");
      ctx.app.emit("error", restoreGoodsError, ctx);
    }
  }


  // 获取商品列表
  async getGoods(ctx, next) {
    try {
      const { page_num = 1, page_size = 10 } = ctx.request.query
      const res = await getGoodsList(page_num, page_size)
      ctx.body = {
        code: "10000",
        message: '获取商品列表成功',
        result:res
      }
    } catch (error) {
      console.error('获取商品列表失败', error)
      ctx.app.emit('error',getGoodsError,ctx)
    }
    
  }
}
module.exports = new GoodsController();
