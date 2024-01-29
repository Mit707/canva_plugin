import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import { getUrl } from "../constants/api";

const axiosInstance = axios.create();

interface IMiscellaneousRequestParams {
  contentType?: string;
  isPublic?: boolean;
  cancelToken?: CancelToken;
}

export interface IResponseObject<T> {
  is_error: boolean;
  message: string;
  data: T;
}

/**
 * get method
 * @param request object containing axios params
 */
const get = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) => commonAxios({ method: "GET", url: getUrl(url, params), ...otherData });

/**
 * post method
 * @param request object containing axios params
 */
const post = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) =>
  commonAxios({ method: "POST", url: getUrl(url), data: params, ...otherData });

/**
 * authpost method
 * @param request object containing axios params
 */
const authpost = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) =>
  commonAxios({ method: "POST", url: getUrl(url), data: params, ...otherData });

/**
 * put method
 * @param request object containing axios params
 */
const put = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) =>
  commonAxios({ method: "PUT", url: getUrl(url), data: params, ...otherData });

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) =>
  commonAxios({
    method: "DELETE",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

/**
 * patch method
 * @param request object containing axios params
 */
const patch = (
  url: string,
  params: any = {},
  otherData: IMiscellaneousRequestParams = {}
) =>
  commonAxios({
    method: "PATCH",
    url: getUrl(url),
    data: params,
    ...otherData,
  });

interface IAxiosParams extends IMiscellaneousRequestParams {
  method: string;
  url: string;
  data?: any;
}

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type, isLogin
 */
const commonAxios = (config: IAxiosParams): Promise<any> => {
  const {
    method,
    url,
    data,
    contentType = "application/json",
    isPublic = false,
  } = config;
  const headers: any = {
    "Content-Type": contentType,
  };
  const authToken = localStorage.getItem("token");
  // if end point is public than no need to provide access token
  if (!isPublic) {
    headers["Authorization"] = `Bearer ${authToken}`;
    // 797a7e417ddffd7cc9976d53
  }

  let body: any = null;
  body = data;

  const axiosInstanceParams = {
    method: method,
    baseURL: BACKEND_HOST,
    url: url,
    headers: headers,
    data: body,
  } as AxiosRequestConfig;

  return new Promise((resolve, reject) => {
    axiosInstance(axiosInstanceParams)
      .then((response: AxiosResponse<IResponseObject<any>>) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log("error", error);
        const isResolve = [409, 404, 400, 422, 400].includes(
          error.response.status
        );
        isResolve ? resolve(error) : reject(error);
      });
  });
};

export { axiosInstance };

const HttpService = {
  get: get,
  post: post,
  put: put,
  deleteRequest: deleteRequest,
  patch: patch,
};

export default HttpService;
