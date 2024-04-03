import axios from "axios";

// https://api.coingecko.com/api/v3/coins/list
// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

type Response = {
  [id: string]: { usd: number };
};

export default async function cointousd(coinName: string) {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    { params: { ids: coinName, vs_currencies: "usd" } },
  );
  return response.data as Response;
}

// api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken
