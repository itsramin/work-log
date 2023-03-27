import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import Modal from "./Modal";

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
      <div className="delete-title">Are you sure to delete?</div>
      <div className="delete-actions">
        <div className="delete-no" onClick={noHandler}>
          No
        </div>
        <div className="delete-yes" onClick={yesHandler}>
          Yes
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
