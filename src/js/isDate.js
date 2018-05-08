/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return '';
    var year = str.slice(0, 4);
    var month = str.slice(4, 6);
    var day = str.slice(6, 8);
    return year +"."+ month +"."+ day
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
export const getWeek = (dateString) => {
    var date;
    if(!dateString){
        date = new Date();
    }else{
        var dateArray = dateString.split(".");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    //return "星期" + weeks[date.getDay()];
    return "星期" + "日一二三四五六".charAt(date.getDay());
};

/**
 * 根据日期获取数字日期
 * @param dateString 日期
 * @returns {String}
 */
export const getStrDate = (date) => {
    var year = String(date.getFullYear());
    var month = date.getMonth()+1;
    var day = date.getDate()
    if(month < 10){
        month = '0' + month
    }   
    if(day < 10){
        day = '0' + day
    }
    return year + month + day
};