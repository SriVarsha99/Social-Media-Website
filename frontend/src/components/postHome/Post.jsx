import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from "../../dummyData";
import { useState, useEffect } from "react";
import likeImg from "./like.png";
import Comments from "../comments/Comments";

export default function Post({ post, users }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like,setLike] = useState(post.liked === 1 ? "You liked it" : "Do you like it?");
  const [isLiked,setIsLiked] = useState(post.liked === 1 ? true : false);
  const [likeCount,setlikeCount] = useState(post.like_count);


  const likeHandler =(user_id, post_id)=>{
    if (isLiked) {
      return;
    }
    setLike(isLiked ?  "Do you like it?" :  "You liked it")
    setIsLiked(!isLiked)
    setlikeCount(likeCount+1)
    console.log('like status ' + like)
    console.log("Handling like by user_id " + user_id + " on post_id " + post_id)
    fetch("http://localhost:8800/api/home/addLike", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'user_id': user_id,
        'post_id': post_id
      }
    })
        .then((response) => response.json())
        .then((json) =>{
          console.log("Handled like on post " + json)
        });
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">
              {(() => {
                const user = users.filter((u) => u.user_id == post?.user_id)[0];
                return user ? user.name : 'User not found';
              })()}
            </span>
            <span className="postDate">{post.post_time}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={likeImg} onClick={() => likeHandler(111, post?.post_id)} alt="" />
            <span className="postLikeCounter">Your like status: {like}, Total likes: {likeCount}</span>
          </div>
          <div className="postBottomRight" >
            <span className="postCommentText" onClick={() => setCommentOpen(!commentOpen)}>{post.comment} comments</span>
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
}
