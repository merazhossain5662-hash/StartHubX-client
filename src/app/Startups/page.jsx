import BrowseStartupComponent from "@/components/BrowseStartupComponent";
import React from "react";

const BrowseStartups = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/startups`);
  const datas = await res.json();
  console.log("hfwe wen jawen", datas);

  return (
    <div>
      <BrowseStartupComponent datas={datas}></BrowseStartupComponent>
    </div>
  );
};

export default BrowseStartups;
