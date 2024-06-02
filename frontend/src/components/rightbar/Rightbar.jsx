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
  }, [user_id]);
    return (
      <>
        <h4 className="rightbarTitle">About</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">DOB:</span>
            <span className="rightbarInfoValue">{userData.dob}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Gender:</span>
            <span className="rightbarInfoValue">{userData.gender}</span>
          </div>
          <div>
          <span className="rightbarInfoKey">Email:</span>
          <span className="rightbarInfoValue">{userData.email}</span>
          </div>
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
