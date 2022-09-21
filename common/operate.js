export default {
	//接口
	api: function() {
	    let version = wx.getAccountInfoSync().miniProgram.envVersion;
	    switch (version) {
		case "develop": //开发预览版
			return "https://www.baidu.com/"
			break;
		case 'trial': //体验版
			return "https://www.baidu.com/"
			break;
		case 'release': //正式版
			return "https://www.baidu.com/"
			break;
		default: //未知,默认调用正式版
			return "http://www.baidu.com/"
			break;
	}
}
}
