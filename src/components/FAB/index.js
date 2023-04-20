import { useState } from "react";
import { Fab } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../store/dataSlice";
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

  const fabList = [
    { label: "In", value: "in", faLabel: "ورود" },
    { label: "Out", value: "out", faLabel: "خروج" },
    { label: "Day Leave", value: "leave", faLabel: "مرخصی" },
  ];
  return (
    <>
      <Fab style={styles.fab} color="primary" onClick={handleFabClick}>
        <MdAdd size={25} />
      </Fab>

      {menuOpen &&
        fabList.map((item, i) => (
          <Fab
            style={{ ...styles.fab, bottom: `${4 * (i + 1) + 2}rem` }}
            color="secondary"
            onClick={() => handleMenuItemClick(item.value)}
            variant="extended"
            key={i}
          >
            {uiSlice.language === "Fa" ? item.faLabel : item.label}
          </Fab>
        ))}
    </>
  );
};

export default FAB;
