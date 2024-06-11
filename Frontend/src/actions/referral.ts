"use server";

import { BASE_URL } from "@/constants/common";

export type User = {
  id: number;
  rank: number;
  address: string;
  deposit: number;
  borrow: number;
  referral: number;
  total: number;
};

export const getUserList = async () => {
  const resp = await fetch(BASE_URL);
  return await resp.json();
};

export const getUser = async (account: string) => {
  const resp = await fetch(userRankURL(account));
  return await resp.json();
};

export const updatePoint = async (
  address: string,
  type: "deposit" | "borrow" | "referral",
  amount: number,
) => {
  await postIfNeeded(address);

  const res = await fetch(userRankURL(address));
  const user = (await res.json()) as User;

  user[type] += amount;

  const body = {
    deposit: user.deposit,
    borrow: user.borrow,
    referral: user.referral,
  };

  await fetch(userRankURL(address), {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

const postIfNeeded = async (address: string) => {
  const res = await fetch(userRankURL(address));
  try {
    (await res.json()) as User;
  } catch {
    await fetch(BASE_URL, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ address }),
    });
  }
};

const userRankURL = (address: string) => {
  return `${BASE_URL}/${address}`;
};
