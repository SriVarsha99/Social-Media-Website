import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from "react";
import Comments from "../comments/Comments";
import { FaHeart } from "react-icons/fa6";
import moment from "moment"

export default function Post({ post, users }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked,setIsLiked] = useState(post.liked === 1 ? true : false);
  const [likeCount,setlikeCount] = useState(post.like_count);
  const [fill, setFill] = useState(post.liked === 1? "red": "white");
  const [user_id, setUserId] = useState(1);


  const likeHandler =(user_id, post_id)=>{
    if (isLiked) {
      setFill("white");
      setIsLiked(!isLiked);
      if(likeCount -1 == 0)
        setlikeCount(null);
      else
        setlikeCount(likeCount-1)

      fetch("http://localhost:8800/api/home/removeLike", {
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
          console.log("Post unliked " + json)
        });
      return;
    }
    setFill("red");
    setIsLiked(!isLiked)
    setlikeCount(likeCount+1)
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
          console.log("Post Liked " + json)
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
            <span className="postDate">{moment(post.post_time).fromNow()}</span>
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
            <FaHeart style={{ width: '20', height: '15' }} fill={fill} strokeWidth = "5em"  stroke="red" onClick={() => likeHandler(user_id, post?.post_id)}/>
            <span className="postLikeCounter">{likeCount}</span>
          </div>
          <div className="postBottomRight" >
            <span className="postCommentText" onClick={() => setCommentOpen(!commentOpen)}>{post.comment} comments</span>
          </div>
        </div>
        {commentOpen && <Comments post_id={post.post_id} />}
      </div>
    </div>
  );
}
