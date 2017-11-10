const express = require('express');
const moment = require('moment');
const router = express.Router();

const NewsType = require('../../models/news_type'); // 引入model
router.get('/',(req,res)=>{
  NewsType.find() // 数据查找
    .then(data=>{
      res.render('admin/news_type/index',{
        list:data,
        moment
      });
    })
})
router.get('/add',(req,res)=>{
  const model = new NewsType();
  res.render('admin/news_type/add',{
    model,
    isEditor:false // 用于区分新增和编辑
  });
})
router.post('/add',(req,res)=>{
  var model = new NewsType(req.body);
  model.save()
    .then(data=>{
      console.log(data);
      // res.send('保存成功')
      res.redirect('/admin/news_type'); // 页面重定向
    })
    .catch(err=>{
      console.log(err);
      res.send(err);
    })
});
router.get('/editor',(req,res)=>{
  if(req.query.id){
    NewsType.findById(req.query.id)
      .then(model=>{
        res.render('admin/news_type/add',{
          model,
          isEditor:true // 用于区分新增和编辑
        });
      })
      .catch(err=>{
        res.send(err);
      })
  }
  else{
    res.send('页面路径错误');
  }
});
router.post('/editor/:id',(req,res)=>{
  NewsType.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
      res.redirect('/admin/news_type');
    })
    .catch(err=>{
      res.send(err);
    })
});


module.exports = router;
