import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

/**
 * The above code sets the default base URL for Axios requests and defines a function to extract the
 * response data.
 * @param {AxiosResponse} response - The parameter "response" is of type AxiosResponse, which is the
 * response object returned by the Axios HTTP client. It contains information about the HTTP response,
 * such as the status code, headers, and the response data.
 */
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }

                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

/* The `requests` object is a collection of functions that make HTTP requests using the Axios library.
Each function corresponds to a different HTTP method (GET, POST, PUT, DELETE) and takes in a URL and
an optional request body. */
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

/* The `const Catalog` object is defining two methods: `list` and `details`. */
const Catalog = {
    list: () => requests.get('Products'),
    details: (id: number) => requests.get(`Products/${id}`),
}

/* The `const TestErrors` object is defining several methods that make HTTP requests to specific
endpoints. Each method corresponds to a different type of error response that can be triggered from
the server. */
const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('Basket'),
    addItem: (productId: number, quantity: number = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity: number = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
}

export default agent;