import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const manageUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      // searchValue: "meraz",
      // searchField: "name",
      // searchOperator: "contains",
      // limit: 100,
      // offset: 100,
      // sortBy: "name",
      // sortDirection: "desc",
      // filterField: "email",
      // filterValue: "hello@example.com",
      // filterOperator: "eq",
    },

    headers: await headers(),
  });

  console.log("users", users);
  return <div></div>;
};

export default manageUsers;
