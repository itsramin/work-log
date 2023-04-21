import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { dataActions } from "../../store/dataSlice";

const DeleteAll = () => {
  const dispatch = useDispatch();
  const deleteAllHandler = () => {
    dispatch(dataActions.deleteAll());
    toast.success("All logs deleted!");
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={deleteAllHandler}>
        <ListItemIcon>
          <DeleteForeverIcon />
        </ListItemIcon>
        <ListItemText
          primary="Delete all logs"
          secondary="All your logs will be deleted."
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DeleteAll;
