type UpdaterFunction = (
  char: HTMLElement,
  charIndex: number,
  localProgress: number,
  isActive: boolean,
  totalChars: number,
) => void;

export type { UpdaterFunction };
