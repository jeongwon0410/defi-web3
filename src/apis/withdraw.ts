import { dai_address, dai_contract, poolContract } from "../constants/contract";

export async function DAIWithdraw(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string,
) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await poolContract.methods
    .withdraw(dai_address, parseInt(result.toString()), account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Withdraw Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}
