import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const MyDialog = ({ isOpen, onClose, title, children, actions }) => {
  return (
    <Dialog
      disableEscapeKeyDown
      open={isOpen}
      onClose={onClose}
      maxWidth={"lg"}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default MyDialog;
