import "./sidebar.css";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import { SearchResult } from "../search/SearchResult";
import {Follow} from "../follow/Follow";

const Sidebar = ({user_id}) =>{
  const [input, setInput] = useState("")
  const [results, setResults] = useState([]);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState({});
  const [option, setOption] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

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

  const fetchRequests = () => {
    fetch('http://localhost:8800/api/followers/requests/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user_id})
    }).then((response) => response.json())
      .then((json) =>{
        setRequests(json);
    });
  }

  const deleteRequest = (u) => {
    setRequests(requests => requests.filter((request)=> request.user_id != u.user_id));
  }

  const handleSelect = (u) => {
    setInput("");
    setResults([]);
    setUser(u);
    fetch('http://localhost:8800/api/followers/status/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id_1: user_id , user_id_2: u.user_id})
    }).then((response) =>  response.json())
    .then((json) =>{
      console.log(json.length);
      if(json.length == 0) {
        setOption("Follow");
      }
      else if(json[0].status == "Request Accepted") {
        setOption("UnFollow");
      } else {
        setOption("Delete");
      }
    });
  }

  const updateRequest = (u, opt) => {
    setUser({});
    setOption("");
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
              return <SearchResult result={result} key={id} handleSelect = {handleSelect}/>;
              })}
            </div>
          </li>
          <ul className="sidebarFriendList">
            {user.user_id && <Follow user_id = {user_id} user={user} option = {option} updateRequest={updateRequest}/> }
          </ul>
        </ul>
        
        <span className="sidebarListItemText">Follow Requests</span>
        <hr className="sidebarHr" /> 
        <ul className="sidebarFriendList">
          {requests.map((u) => (
            <CloseFriend user_id = {user_id} key={u.user_id} user={u} deleteRequest = {deleteRequest}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;