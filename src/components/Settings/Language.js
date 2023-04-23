import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  Radio,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import { uiActions } from "../../store/uiSlice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANG_ARR, LANG_OBJ } from "../../util/labels";

const Language = () => {
  const uiSlice = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const saveLanguageHandler = () => {
    dispatch(uiActions.setLang(selectedLng));
    setOpenLanguage(false);
  };

  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectedLng, setSelectedLng] = useState(uiSlice.language);

  const handleOpenLanguage = () => {
    setOpenLanguage(true);
  };

  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton component="label" onClick={handleOpenLanguage}>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Language" id="switch-language" />
      </ListItemButton>
      <Dialog
        disableEscapeKeyDown
        open={openLanguage}
        onClose={handleCloseLanguage}
        maxWidth={"lg"}
      >
        <DialogTitle>Select Language</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "250px",
            }}
          >
            {LANG_ARR.map((lng, i) => (
              <Box
                sx={{ cursor: "pointer" }}
                key={i}
                onClick={() => setSelectedLng(lng.name)}
              >
                <Radio
                  checked={lng.name === selectedLng}
                  value={lng.name}
                  name="radio-buttons"
                />
                {lng[LANG_OBJ[uiSlice.language]]}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLanguage}>Cancel</Button>
          <Button onClick={saveLanguageHandler}>Ok</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default Language;
