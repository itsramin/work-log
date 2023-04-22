import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { dataActions } from "../../../store/dataSlice";
import MyDialog from "../../MyDialog";

import styles from "./index.module.css";

const DeleteModal = ({ isOpen, onClose, ids }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(dataActions.delete(ids));
    onClose();
  };

  const content = (
    <div className={styles["delete-title"]}>
      Are you sure to delete this log?
    </div>
  );

  const actions = (
    <Stack spacing={2} direction="row">
      <Button variant="text" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" onClick={submitHandler} color="error">
        Yes
      </Button>
    </Stack>
  );

  return (
    <>
      <MyDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Delete"
        children={content}
        actions={actions}
      />
    </>
  );
};

export default DeleteModal;
