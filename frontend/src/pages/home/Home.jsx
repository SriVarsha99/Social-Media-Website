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
        <Feed user_id={user_id}/>
      </div>
    </>
  );
}