const Record = require('../models/record');
const User = require('../models/user');
const { calculateTotalTime, calculateTimeRemain, calculateTotalNum, calculateNumRemain } = require('../utils/helpChart');


module.exports.index = async(req, res) => {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId).populate('records').populate('setting');
    // const records = await Record.find({});
    const setting = currentUser.setting;
    const records = currentUser.records;
    const totalHr = calculateTotalTime(records);
    const timeRemain = calculateTimeRemain(totalHr, setting);
    const timePercent = Math.round(totalHr/(totalHr+timeRemain)*100);
    const totalNum = calculateTotalNum(records);
    const numRemain = calculateNumRemain(totalNum, setting);
    const numPercent = Math.round(totalNum/(totalNum+numRemain)*100);
    res.render('records/index', {records, setting, totalHr, timeRemain, totalNum, numRemain, timePercent, numPercent});
}

module.exports.renderNewForm = (req, res)=> {
    res.render('records/new');
}

module.exports.createRecord = async(req, res, next) => {
    const record = new Record(req.body.record);
    const currentUser = await User.findById(req.user._id);
    currentUser.records.push(record);
    await record.save();
    await currentUser.save();
    req.flash('success', 'Your reading is recorded');
    res.redirect('/records');
}