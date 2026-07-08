import React from "react";

const startupDetailsPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default startupDetailsPage;
