/* 
  商品模块控制器
*/
const path = require("path");

const {
  uploadError,
  unSupportedFileType,
  addGoodsError,
} = require("../constant/err.type");

const { createGoods } = require("../service/goods.service");

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
}
module.exports = new GoodsController();
