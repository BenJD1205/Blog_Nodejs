const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class SiteController {
    
    //[GET]/
    index(req,res,next){
        // Course.find({}, function(err,courses){
        //     if(!err) {
        //         res.json(courses);
        //     }else{
        //         next(err);
        //         res.status(400).json({error: 'ERROR!'});
        //     }
        // });

        Course.find({})
            .then(courses => {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next)

        // res.render('home');
    }

    //[GET]/search
    search(req,res,next){
        res.render('search');
    }
}

module.exports = new SiteController;