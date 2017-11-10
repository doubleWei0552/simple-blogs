const express = require('express');
const router = express.Router();

const utils = require('../../../tools/utils');
const News = require('../../../models/news');
router.get('/',(req,res)=>{
  let page = 1; // 当前页码
  if(req.query.page){
    page = Number(req.query.page);
  }
  const queryCount = News.count();
  const queryData = News.find().select('title img description').sort({_id:-1}).populate('news_type') // 数据查找
    .limit(global.pageSize).skip((page-1)*global.pageSize);
  const pAll = Promise.all([queryCount,queryData])
  pAll.then(([allCount,data])=>{
    const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
    // console.log(pageCount);
    const arrPages = utils.getPagesArr(page,pageCount); // 总页数
    res.json({
      status:'y',
      msg: '获取数据成功',
      data:{
        list:data,
        pages:arrPages, //页面中显示的分页页码
        pageCount, //总页数
        pageIndex:page, //当前页码
      }
    });
  })
})

module.exports = router;
