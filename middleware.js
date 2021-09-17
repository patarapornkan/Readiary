const Record = require('./models/record');
const Setting = require('./models/setting');
const {recordSchema, settingSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.validateRecord = (req, res, next)=> {
    const { error } = recordSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateSetting = (req,res, next)=> {
    const { error } = settingSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next)=> {
    if(req.isAuthenticated()){
        next();
    } else{
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be signed in');
        res.redirect("/login");
    }
}