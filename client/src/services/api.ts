import axios from 'axios';
import type { linksDataType } from '../utils/linksData';

const API_ENDPOINT = '/api/v1/url';

/**
 * Makes a POST request to the backend to shorten a URL.
 * The backend now returns the complete metadata object upon creation.
 *
 * @param originalUrl - The user's input URL.
 * @returns A Promise that resolves to the full link metadata object.
 */

export const shortenUrlApi = async (
  originalUrl: string
): Promise<linksDataType> => {
  try {
    if (import.meta.env.PROD) {
      // This block runs only when you run `vite build`
      URL = import.meta.env.VITE_RENDER_URL;
    } else {
      // This block runs when you run `vite` (dev server)
      URL = import.meta.env.VITE_BASE_URL;
    }

    const response = await axios.post<linksDataType>(`${URL}${API_ENDPOINT}`, {
      originalUrl,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occured!!';
    throw new Error(errorMessage);
  }
};
