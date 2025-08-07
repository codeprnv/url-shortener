const getFavicons = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
  } catch (error) {
    console.error(`An error occured fetching favicons: ${error}`);
    return '';
  }
};

export default getFavicons;
