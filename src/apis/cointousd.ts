import axios from "axios";

export default async function cointousd(coinName: string): Promise<any> {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coinName,
          vs_currencies: "usd",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
}
