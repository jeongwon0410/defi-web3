import { dai_contract } from "../constants/contract";
import { pool_address } from "@/abi/addresses";

export async function DAIAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string,
) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await dai_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}
