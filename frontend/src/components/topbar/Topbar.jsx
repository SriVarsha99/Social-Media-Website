import "./topbar.css";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Bronco Connect</span>
      </div>
      <div className="topbarCenter">
      </div>
      
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Profile</span>
        </div>
        <div className="topbarImg"/>
      </div>
    </div>
  );
}
