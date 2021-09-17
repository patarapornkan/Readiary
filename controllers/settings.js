const Setting = require('../models/setting');
const User = require('../models/user');

module.exports.renderSetting = async(req, res)=> {
    const currentUser = await User.findById(req.user._id).populate('setting');
    const setting = currentUser.setting;
    res.render('setting/show', {setting});
}

module.exports.updateSetting = async(req, res) => {
    const currentUser = await User.findById(req.user._id);
    const currentSettingId = currentUser.setting;
    const currentSetting = await Setting.findByIdAndUpdate(currentSettingId, req.body.setting);
    await currentSetting.save();
    await currentUser.save();
    res.redirect('/setting');
}

module.exports.renderNewForm = (req, res)=> {
    res.render('setting/new');
}

module.exports.createSetting = async(req, res)=> {
    const newSetting = new Setting(req.body.setting);
    const currentUser =  await User.findById(req.user._id);
    currentUser.setting = newSetting;
    await newSetting.save();
    await currentUser.save();
    res.redirect('/records')
}



