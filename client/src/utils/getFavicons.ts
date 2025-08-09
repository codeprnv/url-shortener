const getFavicons = (url: string): string => {
  try {
    // const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=24&domain=${url}`;
  } catch (error) {
    console.error(`An error occured fetching favicons: ${error}`);
    return '';
  }
};

export default getFavicons;
