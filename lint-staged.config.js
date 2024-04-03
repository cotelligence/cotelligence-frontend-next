module.exports = {
  '*.{ts,tsx}': (filenames) => {
    const targetFileNames = filenames.map((file) => `"${file}"`).join(' ');

    return [
      `eslint --cache --fix ${targetFileNames}`,
      `prettier --cache --write ${targetFileNames}`,
      'tsc --noEmit',
    ];
  },
  '*.{mjs,cjs,js,jsx}': (filenames) => {
    const targetFileNames = filenames.map((file) => `"${file}"`).join(' ');

    return [
      `eslint --cache --fix ${targetFileNames}`,
      `prettier --cache --write ${targetFileNames}`,
    ];
  },
  '**/*.{json,css,less,scss,yml,yaml,html}': (filenames) => {
    const targetFileNames = filenames.map((file) => `"${file}"`).join(' ');

    return [`prettier --cache --write ${targetFileNames}`];
  },
};
