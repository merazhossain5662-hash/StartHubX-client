import TransactionsTable from "@/components/TransactionsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const transactionsPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/admin/subscriptions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const transactions = await res.json();
  return <TransactionsTable transactions={transactions} />;
};

export default transactionsPage;
