import "./topbar.css";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import IconButton from '@mui/material/IconButton';

export default function Topbar() {
  const navigate = useNavigate()
  const logout = () =>{
     navigate("/login");
  }

  const navigateHome = () =>{
    navigate("/home");
  }
  const navigateProfile = () =>{
    navigate("/profile");
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Bronco Connect</span>
      </div>
      <div className="topbarCenter">
      </div>
      
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={navigateHome}>Homepage</span>
          <span className="topbarLink" onClick={navigateProfile}>Profile</span>
        </div>
        
        <div className="topbarImg" onClick={logout}>
        <Tooltip title="Logout">
          <IconButton>
            <IoIosLogOut fill="white" />
          </IconButton>
        </Tooltip> 
        </div>
      </div>
    </div>
  );
}
