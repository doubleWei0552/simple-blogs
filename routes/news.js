const moment = require('moment');
const express = require('express');
const router = express.Router();
const News = require('../models/news'); // 引入model
const NewsType = require('../models/news_type');



router.get('/',(req,res)=>{
  const queryType = NewsType.find().sort({_id:-1});
  let query = {}
  if(req.query.type){
    query.news_type = req.query.type;
  }
  const queryData = News.find(query).sort({_id:-1}).select('img title description').limit(global.pageSize);
  const pAll = Promise.all([queryType,queryData]);
  pAll.then(([types,list])=>{
    res.render('news/list', {
      types,
      list
    });
  })
})

router.get('/show',(req,res)=>{
  News.findByIdAndUpdate(req.query.id,{$inc:{views_count:1}})
    .then(d=>{
      // console.log(d) // 浏览量自增
    })
    .catch(e=>{
      console.log(e)
    })
  const queryType = NewsType.find().sort({_id:-1});
  const queryData = News.findById(req.query.id);
  const pAll = Promise.all([queryType,queryData]);
  pAll.then(([types,model])=>{
    res.render('news/show', {
      types,
      model,
      moment
    });
  })
});


module.exports = router;
