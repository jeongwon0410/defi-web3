import getTotalMarketValueDev from "./dev/getTotalMarketValue";
import getTotalMarketValueProd from "./prod/getTotalMarketValue";
import { GetTotalMarketValue } from "./type";

export const isDev = true;

// Main
export const getTotalMarketValue: GetTotalMarketValue = isDev
  ? getTotalMarketValueDev
  : getTotalMarketValueProd;
