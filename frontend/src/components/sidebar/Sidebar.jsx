import "./sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import SearchIcon from '@mui/icons-material/Search';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Friend Requests</span>
          </li>
          <li className="sidebarListItem">
          <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for people"
            className="searchInput"
          />
        </div>
          </li>
          
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
