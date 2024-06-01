import { useEffect } from "react";
import "./follow.css";

export const Follow = ({user_id, user, option, updateRequest}) => {

    const followRequest = (u, option) => {
      if(option == "Follow") {
            fetch('http://localhost:8800/api/followers/follow/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id_1: user_id , user_id_2: u.user_id})
          });
      } else {
        fetch('http://localhost:8800/api/followers/unfollow/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id_1: user_id , user_id_2: u.user_id})
        });
      }
      updateRequest(u, option);
    }
    return (
      <li className="sidebarFriend">
        <div className="friendName"><div className="sidebarFriendName">{user.name}</div></div>
        <div className="action"><button className="follow" onClick={() =>  followRequest(user, option)}>{option}</button></div>
      </li>
    );
  };
  