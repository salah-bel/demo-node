const logger = (req, res, next)=>{
    console.log('Logger intercepté')
    console.log(req.method)
    console.log(req.url)
    next()
}


module.exports = logger;