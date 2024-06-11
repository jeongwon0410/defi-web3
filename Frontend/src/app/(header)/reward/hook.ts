import useSWR from "swr";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getUser, getUserList, User } from "@/actions/referral";
import { BASE_URL } from "@/constants/common";

export const useRewardPage = () => {
  const { address } = useAccount();
  const { data, error } = useSWR<User>(address, getUser);

  useEffect(() => {
    if (error) toast.error((error + "").split("\n")[0]);
  }, [error]);

  const copy = () => {
    if (address === undefined || typeof window !== "object") {
      toast.error("Error: wallet not connected");
      return;
    }

    const url = `${window.location.origin}?referral=${address}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied");
  };

  return { data, copy };
};

export const useRewardPageTable = () => {
  const { data, error } = useSWR<User[]>(BASE_URL, getUserList);

  useEffect(() => {
    if (error) toast.error(error + "".split("\n")[0]);
  }, [error]);

  return data;
};
