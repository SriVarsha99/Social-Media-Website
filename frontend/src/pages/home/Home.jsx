import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feedHome/Feed";
import "./home.scss"

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
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
                <h4 className="homeInfoName">Srivarsha</h4>
                <span className="homeInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="homeRightBottom">
        <Feed/>
        </div>
        </div>
      </div>
    </>
  );
}