// console.log('我是操作数据库的文件!...');
/**
 * mongoose是一个nodejs链接mongodb的orm
 * 	orm对象模型关系映射,把一个对象映射到数据库中的表(集合)之上
 * 	在mongoose中会自动在数据库中生成对象的复数形式作为对象的存储表(集合)
 */
// 在mongoose中使用promise方式获取数据
//	成功执行then,失败执行catch
const mongoose = require('mongoose'); // 引入mongoose插件
mongoose.Promise = global.Promise; // 使用nodejs内置的promise对象
const Schema = mongoose.Schema;				// Schema模型架构
mongoose.connect('mongodb://localhost/super_shop',{
  useMongoClient: true
},err=>{
  if(err){
    console.log(err);
    console.log('数据库链接失败...')
  }
  else{
    console.log('数据库链接成功')
  }
});
module.exports = {
  mongoose: mongoose,
  Schema: Schema
}
