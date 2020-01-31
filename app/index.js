const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const mongoose = require('mongoose')
const routing = require('./routes')

const app = new Koa()
const {connectionStr} = require('./config')

mongoose.connect(
    connectionStr,
    {useUnifiedTopology:true, useNewUrlParser:true},
    ()=> console.log('mongodb 链接成功')
)
mongoose.connection.on('error',console.error)

app.use(koaStatic(path.join(__dirname,'public')))
app.use(error({
    postFormat: (e,{stack, ...rest})=>process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
app.use(
    koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname, 'public/uploads'),
        keepExtensions:true,
        maxFieldsSize: 2 * 1024 * 1024,
        onFileBegin:(name, file)=>{
            console.log(`name:${name}`)
            console.log(file)
        }
    }
}))
app.use(parameter(app))
routing(app)
app.listen(3000,()=>console.log('程序启动在3000端口'))