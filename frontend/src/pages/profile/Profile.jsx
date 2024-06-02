import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Profile() {
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
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div
                className="profileCoverImg"
              />
              <div
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{userData.name}</h4>
                <span className="profileInfoDesc">Hello friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
