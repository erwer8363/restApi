const fs = require('fs')

module.exports = app =>{
    fs.readdirSync(__dirname).forEach(file=>{
        console.log('这个文件是...',file)
        if(file === 'index.js'){
            return
        }
        const route = require(`./${file}`)
        app.use(route.routes()).use(route.allowedMethods())
    })
}