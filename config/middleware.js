module.exports.setFlash = function(req, res, next){
    //taking out the flash msg from req and putting it into res.
    res.locals.flash = {

        'success':req.flash('success'),
        'error':req.flash('error')
    }

    next(); //passing Response(res) to the browser or next middleware
    
}