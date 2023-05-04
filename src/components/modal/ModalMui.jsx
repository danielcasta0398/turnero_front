import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ModalMui({
  isActive,
  onClose,
  render = <h1>No Estas pasando nada para renderizar</h1>,
}) {
  return (
    <div>
      <Modal
        open={isActive}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{render}</Box>
      </Modal>
    </div>
  );
}
