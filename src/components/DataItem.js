import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";

const DataItem = (props) => {
  const rowClass = `item-row ${props.item.status === "in" ? "green" : "red"}`;

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(dataActions.setDeleteId({ id: props.item.id }));
  };

  const editHandler = () => {
    dispatch(dataActions.setEditId({ id: props.item.id }));
  };
  return (
    <div className={rowClass}>
      <div className="item-date">{props.item.date}</div>
      <div className="item-time">{props.item.time.slice(0, 5)}</div>
      <div className="item-status">{props.item.status}</div>
      <div className="item-actions">
        <MdDelete
          className="item-delete"
          color="#a8a8a8"
          onClick={deleteHandler}
        />
        <MdEdit className="item-delete" color="#a8a8a8" onClick={editHandler} />
      </div>
    </div>
  );
};

export default DataItem;
