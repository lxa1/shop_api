/* 
  错误类型
*/
module.exports = {
  // 用户模块错误
  userFormatError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  userAlreadyExited: {
    code: "10002",
    message: "用户名已存在",
    result: "",
  },
  userRegisterError: {
    code: "10003",
    message: "注册出现错误，请稍后再试",
    result: "",
  },
  userDoesNotExist: {
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  invalidPassword: {
    code: "10005",
    message: "密码错误",
    result: "",
  },
  loginError: {
    code: "10006",
    message: "登陆出现未知错误",
    result: "",
  },
  updatePasswordError: {
    code: "10007",
    message: "密码修改失败",
    result: "",
  },
  samePasswordError: {
    code: "10008",
    message: "密码与之前密码一致，请重新修改",
    result: "",
  },

  //身份验证模块错误
  tokenExpiredError: {
    code: "10101",
    message: "token已过期",
    result: "",
  },
  jsonWebTokenError: {
    code: "10102",
    message: "无效的token",
    result: "",
  },
  tokenVerifyError: {
    code: "10103",
    message: "token验证出现错误",
    result: "",
  },
  notFoundToken: {
    code: "10104",
    message: "请登录",
    result: "",
  },
  hasNotAdminPermission: {
    code: "10105",
    message: "没有管理权限",
    result: "",
  },
  // 上传图片模块错误
  uploadError: {
    code: "10201",
    message: "上传失败",
    result: "",
  },
  unSupportedFileType: {
    code: "10202",
    message: "不支持的文件格式",
    result: "",
  },

  //商品模块错误
  goodsFormatError: {
    code: "10301",
    message: "商品添加参数格式错误",
    result: "",
  },
  addGoodsError: {
    code: "10302",
    message: "商品添加失败",
    result: "",
  },
  invalidGoodsId: {
    code: "10303",
    message: "无效的商品Id",
    result: "",
  },
  updateGoodsError: {
    code: "10304",
    message: "商品信息更新失败",
    result: "",
  },
  removeGoodsError: {
    code: "10305",
    message: "商品删除失败",
    result: "",
  },
  restoreGoodsError: {
    code: "10306",
    message: "商品恢复失败",
    result: "",
  },
  getGoodsError: {
    code: "10307",
    message: '获取商品信息失败',
    result:''
  }
};
