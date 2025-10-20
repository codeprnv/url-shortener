import { deleteUrlApi, getAllLinksApi, shortenUrlApi } from '@/services/api';
import type { linksDataType } from '@/utils/linksData';
import useSWR from 'swr';

// const fetcher = () => getAllLinksApi();

export function useLinks() {
  const { data, error, isLoading, mutate } = useSWR<linksDataType[]>(
    '/api/v1/url',
    getAllLinksApi,
    {
      revalidateOnFocus: true,
      dedupingInterval: 7000,
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

  const deleteLinks = async (linksToDelete: linksDataType[]) => {
    const originalData = data;

    const optimisticData = data?.filter(
      (link) => !linksToDelete.find((ltd) => ltd._id === link._id)
    );

    mutate(optimisticData, false);

    try {
      await Promise.all(
        linksToDelete.map((link) => {
          const shortId = link.shortlink.split('/')[3];
          if (!shortId) {
            throw new Error(`Invalid shortlink format: ${link.shortlink}`);
          }
          return deleteUrlApi(shortId)
        })
      );
      
    } catch (err) {
      mutate(originalData, false)
      throw err
    }
  };

  return {
    links: data,
    error,
    isLoading,
    addLink,
    deleteLinks
  };
}
