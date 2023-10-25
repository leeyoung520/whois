import axios from "axios";
import { API_HOST } from "../constant";
import { message } from "antd";

// /**
//  *
//  * @param {object} param
//  * @param {'get' | 'post' =} param.method
//  * @param {string} param.url
//  * @param {object=} param.params
//  * @param {object=} param.data
//  * @param {object=} param.totalCount
//  */
export type CallApiInfo = {
  method?: 'get' | 'post',
  url: string,
  params?: object,
  data?: object
}
export function callApi({method="get", ...callApiInfo}: CallApiInfo) {
  return axios({
    ...callApiInfo,
    method,
    baseURL: API_HOST,
  })
    .then((response) => {
      const { resultCode, resultMessage, totalCount } = response.data;
      if (resultCode < 0) {
        message.error(resultMessage);
      }
      return {
        isSuccess: resultCode === ResultCode.Success,
        data: response.data.data,
        resultCode,
        resultMessage,
        totalCount,
      };
    })
    .catch(() => {
      return {
        isSuccess: false,
      };
    });
}

export const ResultCode = {
  Success: 0,
};