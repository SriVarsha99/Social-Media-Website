import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feedHome/Feed";
import "./home.scss"
import { useState, useEffect} from "react";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState({ name: ""});
  const user_id = localStorage.getItem('user_id');
  
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

  console.log(userData); 
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar user_id={user_id}/>
        <div className="homeRight">
          <div className="homeRightTop">
            <div className="homeCover">
              <div
                className="homeCoverImg"
              />
              <div
                className="homeUserImg"
              />
            </div>
            <div className="homeInfo">
                <h4 className="homeInfoName">{userData.name}</h4>
            </div>
          </div>
          <div className="homeRightBottom">
          <Feed user_id={user_id} />
        </div>
        </div>
      </div>
    </>
  );
}