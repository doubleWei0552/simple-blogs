const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const newsSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: String,
    default: ''
  },
  views_count: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ''
  },
  news_type: {
    type: Schema.Types.ObjectId, // 分类id
    ref: 'news_type' // 关联的模型,在创建模型(Model)时候的参数一 模型的名字
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
const News = mongoose.model('news',newsSchema);

module.exports = News;
