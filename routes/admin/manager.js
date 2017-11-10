const express = require('express');
const router = express.Router();
const utils = require('../../tools/utils');

const AdminUser = require('../../models/admin_user'); // 引入model
router.get('/',(req,res)=>{
  let page = 1; // 当前页码
  if(req.query.page){
    page = Number(req.query.page);
  }
  const queryCount = AdminUser.count();
  const queryData = AdminUser.find() // 数据查找
    .limit(global.pageSize).skip((page-1)*global.pageSize);
  const pAll = Promise.all([queryCount,queryData])
  pAll.then(([allCount,data])=>{
    const pageCount = Math.ceil(allCount/global.pageSize); // 总页数
    // console.log(pageCount);
    const arrPages = utils.getPagesArr(page,pageCount); // 总页数
    res.render('admin/manager/index',{
      list:data,
      pages:arrPages, //页面中显示的分页页码
      pageCount, //总页数
      pageIndex:page, //当前页码
    });
  })
})
router.get('/add',(req,res)=>{
  let model = new AdminUser();
  res.render('admin/manager/add',{
    model,
    isEditor:false
  });
})
router.post('/add',(req,res)=>{
  var model = new AdminUser(req.body);
  if(model.user_name.trim()==''){
    res.send('用户名不能为空');
    return;
  }
  if(model.user_pwd.trim()==''){
    res.send('密码不能为空');
    return;
  }
  if(model.email.trim()==''){
    res.send('邮箱不能为空');
    return;
  }
  AdminUser.validateUserName(model,function(isok){
    if(isok){
      // 加密密码
      model.user_pwd = utils.md5(req.body.user_pwd);
      model.save()
        .then(data=>{
          console.log(data);
          res.redirect('/admin/manager'); // 页面重定向
        })
        .catch(err=>{
          console.log(err);
          res.send(err);
        })
    }
    else{
      res.send('用户名或者邮箱已经存在')
    }
  })
});

router.get('/editor',(req,res)=>{
  if(req.query.id){
    AdminUser.findById(req.query.id)
      .then(model=>{
        res.render('admin/manager/add',{
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
  AdminUser.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
      res.redirect('/admin/manager');
    })
    .catch(err=>{
      res.send(err);
    })
});

router.post('/delete',(req,res)=>{
  if(req.body.id){
    AdminUser.findByIdAndRemove(req.body.id)
      .then(data=>{
        console.log(data);
        res.redirect('/admin/manager');
      })
  }
  else{
    res.send('请选择要删除的id');
  }
});

module.exports = router;
