const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建商品模型
const Address = seq.define("shop_address", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'收货人姓名',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'收货人手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'收货人地址',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment:'是否为默认地址,0:不是（默认）;1:是'
  }
});


// Address.sync({force:true})
module.exports = Address;