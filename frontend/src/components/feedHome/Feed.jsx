import Post from "../postHome/Post";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user_id, setUserId] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8800/api/home/feedPosts", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'user_id': user_id
      }
    })
        .then((response) => response.json())
        .then((json) =>{
          setPosts(json);
        });
  }, []);

  
  useEffect(() => {
    fetch("http://localhost:8800/api/users/")
    .then((response) => response.json())
    .then((json) =>{
      setUsers(json);
    });
}, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Post key={p.post_id} post={p} users = {users}/>
        ))}
      </div>
    </div> 
  );
}