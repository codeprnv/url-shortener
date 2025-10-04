import { Clerk } from '@clerk/clerk-js';
import axios from 'axios';
import type { linksDataType } from '../utils/linksData';

const API_ENDPOINT = '/api/v1/url';

// Create global axios instance
const api = axios.create({
  baseURL: import.meta.env.PROD===false
    ? import.meta.env.VITE_RENDER_URL
    : import.meta.env.VITE_BASE_URL,
});

// Create request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the Clerk singleton instance
    const clerk = window.Clerk as Clerk;

    if (clerk.session) {
      // Get the session token
      const token = await clerk.session.getToken();

      // If token exists add it to the authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const shortenUrlApi = async (
  originalUrl: string
): Promise<linksDataType> => {
  try {
    const response = await api.post<linksDataType>(API_ENDPOINT, {
      originalUrl,
    });
    console.log(`Shorten Url Response: `);
    console.table(response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error Occured: ${error}`);
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occured!!';
    throw new Error(errorMessage);
  }
};

export const getAllLinksApi = async (): Promise<linksDataType[]> => {
  try {
    const response = await api.get<linksDataType[]>(API_ENDPOINT);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'Could not fetch your links!!';
    throw new Error(errorMessage);
  }
};
