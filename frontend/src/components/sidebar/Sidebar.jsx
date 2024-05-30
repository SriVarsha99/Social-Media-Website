import "./sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { SearchResult } from "./SearchResult";

const Sidebar = () =>{
  const [input, setInput] = useState("")
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
      fetch("http://localhost:8800/api/users/")
        .then((response) => response.json())
        .then((json) =>{
          const result = json.filter((user => {
            return value && user && user.name && user.name.toLowerCase().includes(value)
          }));
          setResults(result);
        });
  }

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <div className="searchbar">
              <SearchIcon className="searchIcon" />
              <input
                placeholder="Search for people"
                className="searchInput"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </li>
          <li className="sidebarListItem">
            <div className="searchbarResults">
              {results.map((result, id) => {
              return <SearchResult result={result.name} key={id} />;
              })}
            </div>
          </li>
        </ul>
        
        <span className="sidebarListItemText">Follow Requests</span>
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
export default Sidebar;