import { MdDelete, MdEdit } from "react-icons/md";

const DataItem = (props) => {
  return (
    <div className="item-row">
      <div className="item-date">{props.item.date}</div>
      <div className="item-time">{props.item.time}</div>
      <div className="item-status">{props.item.status}</div>
      <div className="item-actions">
        <MdDelete
          className="item-delete"
          color="#ccc"
          onClick={props.onDelete.bind(null, props.item.id)}
        />
        <MdEdit
          className="item-delete"
          color="#ccc"
          onClick={props.onEdit.bind(null, props.item.id)}
        />
      </div>
    </div>
  );
};

export default DataItem;
