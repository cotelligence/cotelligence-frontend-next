interface Options {
  endOffset: number;
  startOffset: number;
}

const DEFAULT_OPTION = {
  startOffset: 5,
  endOffset: 3,
};

export const maskString = (
  input: string,
  { startOffset, endOffset }: Options = DEFAULT_OPTION,
) => `${input.slice(0, startOffset)}***${endOffset ? input.slice(-endOffset) : ''}`;
