import { List, Divider } from "@mui/material";
import Language from "./Language";
import Import from "./Import";
import Export from "./Export";
import DeleteAll from "./DeleteAll";

const Settings = () => {
  return (
    <nav aria-label="main mailbox folders">
      <List>
        <Language />
        <Divider />
        <Import />
        <Divider />
        <Export />
        <Divider />
        <DeleteAll />
        <Divider />
      </List>
    </nav>
  );
};

export default Settings;
