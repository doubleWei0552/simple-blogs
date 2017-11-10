const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const newsTypeSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
// 分类模型
const NewsType = mongoose.model('news_type',newsTypeSchema);

module.exports = NewsType;
