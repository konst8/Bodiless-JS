function isCurrentPage404(url: string, page404Url:string) {
  return url === page404Url;
}

function getPage404DefaultUrl(url: string) {
  return `${new URL(url).origin}/404`;
}

function getPage404FolderPath(workDir: string) {
  return `${workDir}/404`;
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
  const { isPage404Disabled, page404Url, workDir } = settingsWithDefaults;
  return {
    isPage404Disabled,
    page404Url: isPage404Disabled ? page404Url : '',
    page404FolderPath: getPage404FolderPath(workDir),
  };
}

const page404Handler = {
  getParams,
};

export default page404Handler;
