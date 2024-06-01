import "./closeFriend.css";
import axios from "axios";

const CloseFriend = ({user_id, user, deleteRequest}) => {

  const acceptRequest = (user) => {
    console.log("Accepted request from " + user.name);
    fetch('http://localhost:8800/api/followers/accept/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id_1: user.user_id , user_id_2: user_id})
    });
    deleteRequest(user);
  }

  const declineRequest = (user) => {
    console.log("Declining request from " + user.name);
    fetch('http://localhost:8800/api/followers/decline/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id_1: user.user_id , user_id_2: user_id})
    });
    deleteRequest(user);
  }

  return (
    <li className="sidebarFriend">
      <div className="friendName"><div className="sidebarFriendName">{user.name}</div></div>
      <div className="action"><button className="accept" onClick={() => acceptRequest(user)}>Accept</button></div>
      <div className="action"><button className="decline" onClick={() => declineRequest(user)}>Decline</button></div>
    </li>
  );
}

export default CloseFriend;
