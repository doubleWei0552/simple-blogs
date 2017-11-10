const express = require('express');
const router = express.Router();
const utils = require('../../tools/utils');
const News = require('../../models/news'); // 引入model
const NewsType = require('../../models/news_type');

router.get('/',(req,res)=>{
  let page = 1; // 当前页码
  if(req.query.page){
    page = Number(req.query.page);
  }
  const queryCount = News.count();
  const queryData = News.find().sort({_id:-1}).populate('news_type') // 数据查找
    .limit(global.pageSize).skip((page-1)*global.pageSize);
  const pAll = Promise.all([queryCount,queryData])
  pAll.then(([allCount,data])=>{
    const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
    // console.log(pageCount);
    const arrPages = utils.getPagesArr(page,pageCount); // 总页数
    res.render('admin/news/index',{
      list:data,
      pages:arrPages, //页面中显示的分页页码
      pageCount, //总页数
      pageIndex:page, //当前页码
    });
  })
})
router.get('/add',(req,res)=>{
  const model = new News();
  // 在商品编辑的时候把分类数据显示在商品页面上
  NewsType.find()
    .then(types=>{
      res.render('admin/news/add',{
        types,
        model,
        isEditor: false
      });
    })
})
router.post('/add',(req,res)=>{
  var model = new News(req.body);
  model.save()
    .then(data=>{
      console.log(data);
      // res.send('保存成功')
      res.redirect('/admin/news'); // 页面重定向
    })
    .catch(err=>{
      console.log(err);
      res.send(err);
    })
});

// 编辑
router.get('/editor',(req,res)=>{
  const queryData = News.findByIdAndUpdate(req.query.id,req.body);
  const queryTypes = NewsType.find();
  const qAll = Promise.all([queryTypes,queryData])
    .then(([types,model])=>{
      res.render('admin/news/add',{
        types,
        model,
        isEditor: true
      });
    })
    .catch(err=>{
      res.send(err);
    })
});

router.post('/editor/:id',(req,res)=>{
  News.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
      res.redirect('/admin/news');
    })
    .catch(err=>{
      res.send(err);
    })
});

router.post('/delete',(req,res)=>{
  if(req.body.id){
    News.findByIdAndRemove(req.body.id)
      .then(data=>{
        console.log(data);
        res.redirect('/admin/news');
      })
  }
  else{
    res.send('请选择要删除的id');
  }
});

module.exports = router;
