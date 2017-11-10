# Express应用生成器

> express应用生成器是一个快速搭建web项目的工具,可以生成应用骨架.

```bash
npm i express-generator -g # 全局安装应用生成器
express super-admin -e # 使用ejs模版引擎初始化空白项目
cd super-admin  # 进入项目目录
npm i           # 安装项目依赖项
npm start       # 启动项目,项目的启动信息配置在package.json文件中
    # 在package.json文件的scripts节点中配置的属性名可以通过npm run 执行
    # start节点可以不加run
```

# Run

```bash
# 此项目运行时需要借助nodemon插件进行运行,可以进行安装或者修改package.json中的配置节点即可
npm i       # 安装依赖项目
npm start   #	运行项目
```

# ngrok外网映射

```bash
# https://ngrok.com/
# 通过ngrok插件可以把本机的端口映射一个外网地址
ngrok http 端口号 # 进入所在文件夹,运行命令
```

# 项目中使用的技术点和插件

```
客户端js操作cookie插件:https://github.com/js-cookie/js-cookie
客户端弹出层插件layer:http://layer.layui.com
服务端实现数据加密,使用nodejs内置模块:crypto,参考链接:https://nodejs.org/api/crypto.html
mongoose操作数据库中间件:http://mongoosejs.com/
```

## 使用说明

> 座次表部分功能使用说明

```
系统初始化的时候会生成默认管理员信息,用户名:admin,密码:admin
在管理后台:http://localhost:3000/admin/login 进行登陆
登陆之后在管理后台中输入行(第几排),列(第几个位置).数据配置完成之后,让其他人通过http://localhost:3000/users/reg 页面进行注册,选择自己的行列位置填写姓名即可.
```