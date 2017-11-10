const express = require('express');
const router = express.Router();

// 管理后台主入口页面
router.get('/',(req,res)=>{
  res.render('admin/main')
})

module.exports = router;
