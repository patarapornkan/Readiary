module.exports.calculateTotalTime = (records) => {
    let totalHr = 0;
    for (record of records){
        totalHr = totalHr + record['duration'];
    }
    return totalHr
}

module.exports.calculateTimeRemain = (totalHr, setting) => {
    let timeRemain = setting['time'] - totalHr;
        if(timeRemain < 0) return 0;
        else return timeRemain;
}

module.exports.calculateTotalNum = records => {
    bookArray = [];
    for(record of records){
        let bookName = record.bookName.toLowerCase();
        if(!bookArray.includes(bookName)){
            bookArray.push(bookName);
        }
    }
    console.log(bookArray);
    return bookArray.length;
}

module.exports.calculateNumRemain = (totalNum, setting) => {
    const numRemain = setting['num'] - totalNum;
    if (numRemain > 0) return numRemain
    else return 0;
}