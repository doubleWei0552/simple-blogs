const express = require('express');
const router = express.Router();

// 处理文件上传
const formidable = require('formidable');

router.post('/kindeditor/uploadImg',(req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = global.baseDir+'/public/uploads'; // 图片保存的路径
    form.keepExtensions = true; // 保存文件后缀
    // 格式化request请求数据
    form.parse(req, function(err, fields, files) {
        if(err){
            throw err;
        }
        const image = files.imgFile; // 获取图片信息
        // 获取图片的保存路径web地址
        var filePath = image.path.replace(/\\/g,'/'); // 路径正则替换
        var reGB = global.baseDir.replace(/\\/g,'/'); // 路径正则替换
        const fileUrl = filePath.replace(reGB+'/public','');
        // console.log(fileUrl);
        res.json({
            error:0,
            url:fileUrl
        })
    });
})

/////文件上传
var multer = require('multer');
////设置图片上传后的保存路径 以及保存的文件名 使用了html图片上传插件
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        //console.log(Date.now()+file.originalname.slice('.').slice(-1))
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, Date.now()+'.'+file.originalname.split('.').slice(-1))
    }
})

var upload = multer({ storage: storage })

router.post('/file/uploadfile',upload.single('file'),function(req,res){
    console.log(req)
    console.log(req.file)
    ////返回 路径+文件名
    res.json({url:'/uploads/'+req.file.filename});
})

module.exports = router;