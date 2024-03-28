import { dai_address, dai_contract, poolContract } from "../constants/contract";

export async function DAIBorrow(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string,
) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await poolContract.methods
    .borrow(dai_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Borrow Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}
