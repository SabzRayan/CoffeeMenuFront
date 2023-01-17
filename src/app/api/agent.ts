import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Branch } from "../models/branch";
import { Category } from "../models/category";
import { PaginatedResult } from "../models/pagination";
import { Product } from "../models/product";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  // if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const navigate = useNavigate();
    const status = error.response?.status;
    const data: any = error.response?.data;
    const config = error.response?.config;
    // const headers = error.response!.headers;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          //toast.error(data);
        }
        if (config?.method === "get" && data.errors.hasOwnProperty("id")) {
          console.log(data.errors);
          //history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      //   case 401:
      //     if (
      //       status === 401 &&
      //       headers["www-authenticate"]?.startsWith(
      //         'Bearer error="invalid_token"'
      //       )
      //     ) {
      //       store.userStore.logout();
      //       toast.error("Session expired - please login again");
      //     }
      //     break;
      case 404:
        console.log("Not Found");
        navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Branches = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Branch[]>>("/branch", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Branch>(`/branch/${id}`),
};

const Categories = {
  list: (params: URLSearchParams) =>
    axios.get<Category[]>("/category/all", { params }).then(responseBody),
  details: (id: string) => requests.get<Category>(`/category/${id}`),
};

const Products = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Product[]>>("/product", { params })
      .then(responseBody),
  best: (params: URLSearchParams) =>
    axios.get<Product[]>("/product/best", { params }).then(responseBody),
  details: (id: string) => requests.get<Product>(`/product/${id}`),
};

const agent = {
  Branches,
  Categories,
  Products,
};

export default agent;
