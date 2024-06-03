import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from "../../dummyData";
import { useState, useEffect } from "react";
import Comments from "../comments/Comments";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";

export default function Post({ post, users }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like,setLike] = useState(post.like);
  const [isLiked,setIsLiked] = useState(false);

  useEffect(()=>{
    const featchLikeCount = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/api/comments/likes?post_id="+post.post_id)
        setLike(res.data);
        //console.log("...........Response", res)
      }catch(err){
        //console.log(".............Response Error",err)
      }
    }
    featchLikeCount()

  },[])


  const handleDelete = async(id) =>{
    try{
      axios.delete("http://localhost:8800/api/posts/delete/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
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
            {/* <button onClick={()=>handleDelete(post.post_id)}>Delete</button> */}
            <AiOutlineDelete size="20px" strokeWidth = "2em"  stroke="black" onClick={()=>handleDelete(post.post_id)}/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          <FaHeart style={{ width: '20', height: '15' }} fill="red" strokeWidth = "5em"  stroke="red" />
            <span className="postLikeCounter">{like} {post.like_count}</span>
          </div>
          <div className="postBottomRight" >
            <span className="postCommentText" onClick={() => setCommentOpen(!commentOpen)}>{post.comment} comments</span>
          </div>
        </div>
        {commentOpen && <Comments post_id={post.post_id}/>}
      </div>
    </div>
  );
}
