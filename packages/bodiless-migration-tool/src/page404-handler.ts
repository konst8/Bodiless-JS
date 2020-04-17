import debug from './debug';

function isCurrentPage404(url: string, page404Url:string) {
  return url === page404Url;
}

function getPage404DefaultUrl(url: string) {
  return `${new URL(url).origin}/404`;
}

function getParams(settings: any) {
  const defaultSettings = {
    isPage404Disabled: false,
    page404Url: getPage404DefaultUrl(settings.url),
  };
  const settingsWithDefaults = {
    ...defaultSettings,
    ...settings,
  };
  const { isPage404Disabled, page404Url } = settingsWithDefaults;
  return {
    isPage404Disabled,
    page404Url: isPage404Disabled ? '' : page404Url,
  };
}

function validateScrapedPage(result: any, page404Params: any) {
  const { pageUrl, status } = result;
  const { page404Url, isPage404Disabled } = page404Params;
  const isCurrentPageDefault404 = isCurrentPage404(pageUrl, page404Url);
  if (isPage404Disabled) {
    return result;
  }
  if (isCurrentPageDefault404) {
    debug(`Using ${pageUrl} as a template for default "Page Not Found" page.`);
    return {
      ...result,
      pageUrl: getPage404DefaultUrl(pageUrl),
    };
  }
  if (status === 404) {
    throw new Error(`Page ${pageUrl} does not exist and will be redirected to default 404 page.`);
  }
  return result;
}

const page404Handler = {
  getParams,
  validateScrapedPage,
};

export default page404Handler;
