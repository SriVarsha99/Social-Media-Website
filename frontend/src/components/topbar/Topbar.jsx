import "./topbar.css";
//import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Bronco Connect</span>
      </div>
      <div className="topbarCenter">
        
      </div>
      
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Profile</span>
        </div>
        <div className="topbarImg"/>
      </div>
    </div>
  );
}
