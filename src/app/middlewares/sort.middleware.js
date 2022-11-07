

module.exports = function sortMiddleware(req,res, next){
    req.locals._sort={
        enabled: false,
        type: 'default'
    }

    if(req.query.hasOwnProperty('_sort')){
        
    }   
}
