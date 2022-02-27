export function utc2beijing(utc_datetime) {
	// 转为正常的时间格式 年-月-日 时:分:秒
	var T_pos = utc_datetime.indexOf('T');
	var Z_pos = utc_datetime.indexOf('Z');
	var year_month_day = utc_datetime.substr(0,T_pos);
	var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
	var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

	// 处理成为时间戳
	timestamp = new Date(Date.parse(new_datetime));
	timestamp = timestamp.getTime();
	timestamp = timestamp/1000;

	// 增加8个小时，北京时间比utc时间多八个时区
	var timestamp = timestamp+8*60*60;
	// 时间戳转为时间
	//var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString();
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	var date = new Date(parseInt(timestamp) * 1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds(); 
	//将上面的拼接到一块
	return Y+M+D+h+m+s;
	
} 