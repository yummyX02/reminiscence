import {
	$http
} from "../utils/request";
// 封装uni挂载发送的请求
uni.$http = $http;
// $http.baseUrl = 'https://mmt.sipcoj.com'
$http.baseUrl = 'http://43.142.146.75:38080'