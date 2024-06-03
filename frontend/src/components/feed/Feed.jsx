import Post from "../postt/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";

export default function Feed({user_id}) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/home/posts", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: user_id})
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
        <Share />
        {posts.map((p) => (
          <Post key={p.post_id} post={p} users = {users}/>
        ))}
      </div>
    </div>
  );
}
