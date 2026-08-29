import TransactionsTable from "@/components/TransactionsTable";
import React from "react";

const transactionsPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/admin/subscriptions`,
  );
  const transactions = await res.json();
  return <TransactionsTable transactions={transactions} />;
};

export default transactionsPage;
