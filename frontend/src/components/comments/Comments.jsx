import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import "./comments.scss";
import {isMutation, useQueryClient} from "@tanstack/react-query";
import moment from "moment";


const Comments = ({post_id}) => {
  const[comments,setComments] = useState([])
  const[addComment, setAddComment] = useState([])


  useEffect(()=>{
    const featchAllComments = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/api/comments/requests?post_id="+post_id)
        setComments(res.data);
        //console.log("...........Response", res)
      }catch(err){
        //console.log(".............Response Error",err)
      }
    }
    featchAllComments()

  },[])


  const addNewComment = () =>{
    const text = addComment;
    const user_id = localStorage.getItem('user_id');

    //console.log("......Value:",text,user_id,post_id)

    try{
      axios.post("http://localhost:8800/api/comments/add", {user_id,post_id,text})
      window.location.reload()
    }catch(err){
      console.log(err)
    }
    
  };
 
  
  return (
    <div className="comments">
      <div className="write">
        <input type="text" id="text" placeholder="write a comment" value={addComment} onChange={(e) => setAddComment(e.target.value)} />
        <button  onClick={addNewComment}>ADD</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <div className="info">
            <span>{comment.name}</span>
            <p id="text">{comment.comment_text}</p>
          </div>
          <span className="date">{moment(comment.datetime).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;