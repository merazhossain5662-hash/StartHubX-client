"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

const DeleteOpportunityButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/opportunity/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json(); // 👈 ADD THIS

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) throw new Error(data?.message || "Delete failed");

      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <Button
        isIconOnly
        variant="flat"
        onPress={() => setOpen(true)}
        className="border border-red-500/40 text-red-400 hover:bg-red-500/10"
      >
        <TrashBin />
      </Button>

      {/* Modal */}
      <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
        <Modal.Container className="items-center justify-center">
          <Modal.Dialog className="bg-[#020617] border border-red-500/20 text-white rounded-xl w-[350px]">
            <Modal.Header>
              <Modal.Heading className="text-red-400">
                Delete Opportunity
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-gray-300">
                Are you sure? This action cannot be undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2">
              <Button variant="light" slot="close">
                Cancel
              </Button>

              <Button color="danger" onPress={handleDelete} isLoading={loading}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteOpportunityButton;
