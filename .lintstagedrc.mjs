const config = {
  "*.{js,ts,tsx,css}": "prettier --write",

  // TODO: 리팩터링 후 주석 해제
  "*.{js,ts,tsx}": "eslint --cache --fix",
  "*.{ts,tsx}": () => "tsc --noEmit",
};

export default config;
