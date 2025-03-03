import axios, { AxiosRequestConfig } from "axios";
import { CustomError } from "../utilities/customError";

class HttpService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.get<T>(url, config);
      return response.data;
    } catch (error: any) {
      throw new CustomError(
        `GET request failed: ${error.response?.statusText || error.message}`,
        error.response?.status || 500
      );
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.post<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new CustomError(
        `POST request failed: ${error.response?.statusText || error.message}`,
        error.response?.status || 500
      );
    }
  }
}

export const httpService = new HttpService();
