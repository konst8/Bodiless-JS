export type TFullOverlaySettings = {
  isActive: boolean,
  hasCloseButton: boolean,
  hasSpinner: boolean,
  message: string,
  maxTimeoutInSeconds: number | null,
  onClose: () => void,
};

export type TOverlaySettings = Partial<TFullOverlaySettings>;
