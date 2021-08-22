class NewsController {
    
    //[GET]/news
    index(req,res,next){
        res.render('news');
    }

    //[GET]/:slug
    show(req,res,next){
        res.send('News Detail');
    }
}

module.exports = new NewsController;