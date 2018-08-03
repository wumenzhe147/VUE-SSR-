import axios from 'axios';
let axio = ()=>{
	var instance = axios.create();
	request = instance.interceptors.request.use(config => {
        //在这里对发送的请求进行处理
    }, error => {   
        return Promise.reject(error);
    });
    response = instance.interceptors.response.use(function(res) {
        //在这里对返回的数据进行处理
        

    }, function(err) {
        //Do something with response error
         
        return Promise.reject(err);
    })
    return instance
}
export default axio