const formatLinks = (link: string) => {
  const baseUrl = 'https://linkly.com';
  return `${baseUrl}/${link.split('/')[3]}`;
};

export default formatLinks;
