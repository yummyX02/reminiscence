import {
	$http
} from "../utils/request";
// 封装uni挂载发送的请求
uni.$http = $http;
// $http.baseUrl = 'https://mmt.sipcoj.com'
$http.baseUrl = 'https://43.142.146.75:38080'
// $http.baseUrl = 'https://221.238.82.254:38080'
// $http.baseUrl = 'https://192.168.115.172:38080'
// $http.baseUrl = 'https://192.168.8.219:38080'