const Goods = require('../models/goods');
const GoodsType = require('../models/goods_type');

Goods.find()
  .then(data=>{
    console.log(data)
  })
  .catch(err=>{
    console.log(err)
  })
GoodsType.find()
  .then(data=>{
    console.log(data)
  })
  .catch(err=>{
    console.log(err)
  })
