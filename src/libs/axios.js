import axios from 'axios';
axios.interceptors.response.use(res => {
    // 对响应数据做些什么
    return res
}, err => {
    var mode = process.env.NODE_ENV;
    if(mode == 'development'){
        console.log('服务端异常'+err);
    } else {
        console.log(err);
    }
    return Promise.resolve({
        data: {
            // message: '服务端异常'+err,
            // success: false
        }
    }); // 可在组件内获取到服务器返回信息
});

export default axios;
