import { getAllLinksApi, shortenUrlApi } from '@/services/api';
import type { linksDataType } from '@/utils/linksData';
import useSWR from 'swr';

const fetcher = () => getAllLinksApi();

export function useLinks() {
  const { data, error, isLoading, mutate } = useSWR<linksDataType[]>(
    '/api/v1/url',
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  const addLink = async (longUrl: string) => {
    try {
      const optimisticLink: linksDataType = {
        _id: 'temp-id' + Date.now(),
        originallink: longUrl,
        shortlink: 'Generating...',
        clicks: 0,
        status: true,
        date: new Date().toISOString(),
        qrcode: '',
        qrcodedescription: '',
      };
      mutate((currentData = []) => [optimisticLink, ...currentData], false);

      const actualNewLink = await shortenUrlApi(longUrl);

      mutate((currentData = []) => {
        return currentData.map((link) =>
          link._id === optimisticLink._id ? actualNewLink : link
        );
      }, false);
    } catch (err: any) {
      mutate(
        (currentData = []) =>
          currentData?.filter((link) => link._id !== 'temp-id' + Date.now()),
        false
      );
      throw err;
    }
  };
  return {
    links: data,
    error,
    isLoading,
    addLink,
  };
}
