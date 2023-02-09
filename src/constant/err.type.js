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
  },

  //购物车模块

  cartFormatError: {
    code: '10401',
    message: '购物车参数格式错误',
    result:''
  },
  addCartError: {
    code: '10402',
    message: '添加购物车失败',
    result:''
  },
  getCartError: {
    code: "10403",
    message: '查询购物车列表失败',
    result:''
  },
  cartParamsNullError: {
    code: '10404',
    message: '商品数量和选中参数不能同时为空',
    result:''
  },
  invalidCartId: {
    code: '10405',
    message: '无效的购物车id',
    result:''
  },
  updateCartError: {
    code: '10406',
    message: '更新购物车信息失败',
    result:''
  },
  removeCartError: {
    code: '10407',
    message: '购物车删除失败',
    result:''
  },
  selectCartError: {
    code: '10408',
    message: '购物车商品选择失败',
    result:""
  },


  // 地址模块
  addressFormatError: {
    code: "10501",
    message: '地址参数格式错误',
    result:''
  },
  addAddressError: {
    code: '10502',
    message: '添加地址错误',
    result:''
  },
  getAddressError: {
    code: "10503",
    message: '获取地址列表错误',
    result:''
  },
  invalidAddressId: {
    code: '10504',
    message: '无效的地址Id',
    result:""
  },
  updateAddressError: {
    code: '10505',
    message: '更新地址信息错误',
    result:''
  },
  removeAddressError: {
    code: '10506',
    message: '删除地址失败',
    result:''
  },


  // 订单模块
  orderFormatError: {
    code: '10601',
    message: '订单参数格式错误',
    result:''
  },
  orderTotalError: {
    code: "10602",
    message: '总金额错误',
    result:''
  },
  addOrderError: {
    code: '10603',
    message: "添加订单失败",
    result:''
  },
  getOrderError: {
    code: "10604",
    message: '获取订单失败',
    result:''
  },
  invalidOrderId: {
    code: "10605",
    message: '无效的订单Id',
    result:""
  },
  updateOrderError: {
    code: '10606',
    message: '更新订单失败',
    result:''
  },
};
