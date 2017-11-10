var express = require('express'); // 引入express框架
var path = require('path'); // 引入path模块(路径解析)
var favicon = require('serve-favicon'); // 引入favicon模块
var logger = require('morgan'); // 引入日志模块(终端日志)
var cookieParser = require('cookie-parser'); // cookie格式化
var bodyParser = require('body-parser');  // form表单数据格式化

// 全局设置
global.baseDir = __dirname; // 项目所在目录
global.pageSize = 3; // 分页的页数

// 路由模块文件
var index = require('./routes/index');

// express实例
var app = express();

// view engine setup 模版引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用插件模块
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // 使用终端日志
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 使用自定义路由模块
// app.use('/', index);
app.use('/',require('./routes/news'));
app.use('/common',require('./routes/common'));


// api数据接口
app.use('/api/v1/validate',require('./routes/api/v1/validate'));
app.use('/api/v1/news',require('./routes/api/v1/news'));

const AdminUser = require('./models/admin_user');
const utils = require('./tools/utils');
// 系统初始化的时候创建超级管理员
AdminUser.count({user_name:'admin'})
  .then(c=>{
    if(c==0){
      let admin = new AdminUser({
        user_name: 'admin',
        user_pwd: 'admin',
        is_encryption: 0,
        name: '超级管理员'
      })
      admin.save()
        .then(data=>{
          console.log('系统初始化完成,超级管理员已经添加.用户名:admin,密码:admin');
        })
        .catch(err=>{
          console.log(err);
        })
    }
  })
// 管理后台登录页面
app.get('/admin/login',(req,res)=>{
  res.render('admin/login')
})
app.post('/admin/login_sub',(req,res)=>{
  AdminUser.findOne({$or:[
    {user_name:req.body.uName},
    {email:req.body.uName}
  ]}).then(u=>{
    if(u){
      var strPwd = req.body.uPwd;
      if(u.is_encryption){
        strPwd = utils.md5(strPwd);
      }
      if(strPwd == u.user_pwd){
        // 登陆成功写cookie
        res.cookie('admin_user',u.id,{path:'/'});
        res.json({
          status: 'y',
          msg: '登陆成功'
        })
      }
      else{
        res.json({
          status: 'n',
          msg: '用户密码错误'
        })
      }
    }
    else{
      res.json({
        status: 'n',
        msg: '用户信息不存在'
      })
    }
  })
})
// 设置管理后台的访问权限
// app.all 表示所有的请求(get,post等等)
app.all('/admin/*',(req,res,next)=>{
  if(req.cookies.admin_user){ // 如果已经登陆
    next();
  }
  else{ // 没有登陆进入登陆页面
    res.redirect('/admin/login');
  }
})
app.use('/admin',require('./routes/admin/main')); // 入口首页
app.use('/admin/manager',require('./routes/admin/manager')); // 管理员管理
app.use('/admin/news_type',require('./routes/admin/admin_news_type')); // 资讯分类管理
app.use('/admin/news',require('./routes/admin/admin_news')); // 资讯管理


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
