import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../../store/dataSlice";
import Modal from "../../Modal";
import styles from "./index.module.css";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);
  const yesHandler = () => {
    dispatch(dataActions.delete(dataSlice.deleteIds));
  };
  const noHandler = () => {
    dispatch(dataActions.clearDeleteIds());
  };

  return (
    <Modal>
      <div className={styles["delete-title"]}>Are you sure to delete?</div>
      <div className={styles["delete-actions"]}>
        <div onClick={noHandler}>No</div>
        <div className={styles["delete-yes"]} onClick={yesHandler}>
          Yes
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
