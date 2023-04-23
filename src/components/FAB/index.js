import { useState } from "react";
import { Fab } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../store/dataSlice";
import { LANG_OBJ, STATUS_ARR } from "../../util/labels";
const styles = {
  fab: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    fontFamily: "Vazirmatn",
  },
};

const FAB = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const uiSlice = useSelector((state) => state.ui);
  const dataSlice = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const handleFabClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (option) => {
    const now = new Date();

    const newData = {
      id: +now,
      timeStamp: +now,
      status: option,
    };
    dispatch(dataActions.add(newData));
    setMenuOpen(false);
  };

  return (
    <>
      <Fab style={styles.fab} color="primary" onClick={handleFabClick}>
        <MdAdd size={25} />
      </Fab>
      {/* .filter((s) => dataSlice.lastStatus !== s.name) */}
      {menuOpen &&
        STATUS_ARR.map((item, i) => (
          <Fab
            style={{ ...styles.fab, bottom: `${4 * (i + 1) + 2}rem` }}
            color="secondary"
            onClick={() => handleMenuItemClick(item.name)}
            variant="extended"
            key={i}
            // disabled={
            //   dataSlice.lastStatus === item.name &&
            //   dataSlice.lastStatus !== "leave"
            // }
          >
            {item[LANG_OBJ[uiSlice.language]]}
          </Fab>
        ))}
    </>
  );
};

export default FAB;
