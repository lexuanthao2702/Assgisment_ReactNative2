import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers
    }

    config.data // nếu người dùng truyền data vào thì lấy data

    return config
})

axiosClient.interceptors.response.use(res => {
    if(res.data && res.status === 200) {
        return res.data;
    }

    throw new Error('Error');
}, error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
});

export default axiosClient;


//axiosClient để cấu hình axiosClient có tác dụng hạn chế gọi phương thức và 
// check xem khi nào res là 200, res.data, res.status. Tạo ra 1 lần và gọi lại để sử dụng.
