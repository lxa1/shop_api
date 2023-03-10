const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Goods=require('./goods.model')

// 创建商品模型
const Cart = seq.define("shop_cart", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'商品id',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'用户id'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment:'商品数量',
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment:'商品是否选中'
  }
});

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as:'goods_info'
})

// Cart.sync({force:true})
module.exports = Cart;
