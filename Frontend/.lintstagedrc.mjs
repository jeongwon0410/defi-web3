const config = {
  "*.{js,ts,tsx,css}": "prettier --write",
  "*.{js,ts,tsx}": "eslint --cache --fix",
  "*.{ts,tsx}": () => "tsc --noEmit",
};

export default config;
