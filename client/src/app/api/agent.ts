import axios, {AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
axios.defaults.baseURL = 'http://localhost:5000/api';


const responseBody = (response: AxiosResponse) => response.data;


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    

    const {data, status} = error.response!;
    console.log(data);
    switch (status){
        case 400:
            // @ts-ignore
            if(data.errors) {
                const modelStateErrors: string[] = [];
                // @ts-ignore
                for (const key in data.errors) {
                    // @ts-ignore
                    if(data.errors[key]){
                        // @ts-ignore
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            // @ts-ignore
            toast.error(data.title);
            break;
        case 401:
            // @ts-ignore
            toast.error(data.title);
            break;
        case 500:
            // @ts-ignore
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;