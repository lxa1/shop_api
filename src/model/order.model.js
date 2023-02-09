const { DataTypes} = require("sequelize");

const seq = require("../db/seq");
const Address=require('./address.model')

// 创建用户模型
const Order = seq.define("shop_order", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'用户id'
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:"地址id"
  },
  goods_info: {
    type: DataTypes.JSON,
    allowNull: false,
    comment:'商品信息',
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment:'订单总金额'
  },
  order_number: {
    type: DataTypes.CHAR(16),
    allowNull: false,
    comment:'订单编号'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment:'订单状态：0未支付；1已支付；2已发货；3已签收；4取消'
  }
});
// 创建数据表，同步数据表
// Order.sync({force:true});
Order.belongsTo(Address, {
  foreignKey: 'address_id',
  as:'address_info'
})
module.exports = Order;
