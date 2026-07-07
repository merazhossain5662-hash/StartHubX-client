"use client";
import React, { useState } from "react";
import { TrashBin } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";

const DeleteStartup = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/startups/${id}`,

        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) throw new Error(data?.message || "Delete failed");

      router.refresh();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal>
        <Button className="flex text-red-600/70 rounded-md hover:text-red-600  bg-red-500/20  border border-red-700 hover:bg-red-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 px-2">
          <TrashBin></TrashBin>
          Delete
        </Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <TrashBin></TrashBin>
                </Modal.Icon>
                <Modal.Heading className="text-red-400">
                  Delete Startup
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p className="text-sm text-gray-300">
                  Are you sure? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  isPending={loading}
                  onClick={handleDelete}
                  slot="close"
                  className="flex text-red-600/70 w-full rounded-md hover:text-red-600  bg-red-500/20  border border-red-700 hover:bg-red-600/10 hover:rounded-lg transition-all duration-300 ease-in-out hover:translate-x-0.5 py-4 px-2"
                >
                  <TrashBin></TrashBin>
                  {loading ? "Delete" : "Deleting"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DeleteStartup;
