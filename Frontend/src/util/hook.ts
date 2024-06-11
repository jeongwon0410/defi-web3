import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { RefObject, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { updatePoint } from "@/actions/referral";

export const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current === null) return;
      if (event.target instanceof HTMLElement === false) return;
      if (ref.current.contains(event.target)) return;

      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
};

export const useCloseModal = (
  flag: boolean,
  close: () => void,
  message: string,
) => {
  useEffect(() => {
    if (flag) {
      close();
      toast.success(message);
    }
  }, [flag]);
};

export const useWaitingWriteContract = () => {
  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { address } = useAccount();

  useEffect(() => {
    if (error) {
      console.error(error + "");
      toast.error((error + "").split("\n")[0]);
    }
  }, [error]);

  return {
    writeContract,
    isLoading: isLoading || isPending,
    isSuccess,
    address,
  };
};

export const useInvalidateKeyOnSuccess = (
  queryKey: QueryKey,
  isSuccess: boolean,
) => {
  const client = useQueryClient();

  useEffect(() => {
    isSuccess && client.invalidateQueries({ queryKey });
  }, [isSuccess]);
};

export const useReward = (
  isSuccess: boolean,
  type: "deposit" | "borrow",
  amount: number | undefined,
) => {
  const { address } = useAccount();
  const params = useSearchParams();

  const referral = params.get("referral");

  useEffect(() => {
    if (isSuccess === false || address === undefined || amount === undefined)
      return;
    const point = type === "deposit" ? amount : amount * 4;
    updatePoint(address, type, point);

    if (referral && referral !== address)
      updatePoint(referral, "referral", point / 10);
  }, [isSuccess, address, referral]);
};
