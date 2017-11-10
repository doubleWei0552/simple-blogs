const express = require('express');
const router = express.Router();

const AdminUser = require('../../../models/admin_user');

// 验证用户名是否存在
router.get('/admin_user_name',(req,res)=>{
  // console.log(req.query);
  AdminUser.count({user_name:req.query.user_name})
    .then(c=>{
      if(c>0){
        res.send(false);
      }
      else{
        res.send(true);
      }
    })
})

module.exports = router;
