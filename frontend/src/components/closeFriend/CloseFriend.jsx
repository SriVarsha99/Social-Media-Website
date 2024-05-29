import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <div className="friendName"><div className="sidebarFriendName">{user.username}</div></div>
      <div className="friendName"><button className="accept">Accept</button></div>
      <div className="friendName"><button className="decline">Decline</button></div>
    </li>
  );
}
