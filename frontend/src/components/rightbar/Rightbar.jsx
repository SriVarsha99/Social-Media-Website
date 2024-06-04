import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [userData, setUserData] = useState({ name: "", dob:"",gender:"",email:""});
    const user_id = localStorage.getItem('user_id');
    const [friends, setFriends] = useState([]); 
    console.log(user_id)
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user_id) {
            const response = await axios.post('http://localhost:8800/api/auth/getDataById', { user_id });
            console.log('Response data:', response.data);
            setUserData(response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    fetchData();
    },[user_id]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user_id) {
          const response = await axios.post('http://localhost:8800/api/auth/getFriendsById', { user_id });
          setFriends(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
        }
      } catch (error) {
        console.error('Error fetching friends data:', error);
        setFriends([]); // Set to empty array in case of error
      }
    };
    fetchFriends();
  }, [user_id]);

    return (
      <>
        <h4 className="rightbarTitle">About</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age:</span>
            <span className="rightbarInfoValue">{userData.age}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Gender:</span>
            <span className="rightbarInfoValue">{userData.gender}</span>
          </div>
          <div>
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{userData.email}</span>
          </div>
          <div>
            <span className="rightbarInfoKey">Address:</span>
            <span className="rightbarInfoValue">{userData.address}</span>
          </div>
          <div>
            <span className="rightbarInfoKey">DOB:</span>
            <span className="rightbarInfoValue">{userData.dob}</span>
          </div>
        </div>
        <hr className="sectionDivider" />
        <h4 className="rightbarTitle">Friends</h4>
        <div className="newSectionContainer"> {/* New section container */}
          {/* Content for the new section */}
          <ul className="friendList">
            {friends.map((friend, index) => (
              <li key={index} className="friendItem">
                {friend.name}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
