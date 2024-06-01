import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feedHome/Feed";
import "./home.scss"
import { useState } from "react";

export default function Home() {
  const user_id= useState(1)
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
        <Feed user_id={user_id}/>
      </div>
    </>
  );
}