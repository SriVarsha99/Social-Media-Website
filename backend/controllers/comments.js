import { db } from "../connect.js";
import moment from "moment";

export const requests =(req,res)=>{
    console.log("Comments")
    const q = "SELECT c.*, u.user_id, name FROM comments AS c JOIN user AS u ON (u.user_id = c.user_id) WHERE c.post_id = ? ORDER BY c.datetime DESC"
    db.query(q,[req.query.post_id],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
    })
}

export const add =(req,res)=>{
    console.log("Yessss")

    const q = "INSERT INTO comments (user_id,post_id,comment_text,datetime) VALUES (?,?,?,?)"
    const timen = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    //console.log("Working:",values)
  
    db.query(q,[req.body.user_id,req.body.post_id,req.body.text,timen],(err,data)=>{
      if(err) return res.json(err)
      //console.log("Added to Comments")
      return res.json("Comment is added")
    })
}

export const likes =(req,res)=>{
  const q = "select post_id, like_count from posts where post_id = ?;";
  // Get the username from request headers!
  db.query(q, [req.headers.post_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    //console.log(data);
    res.status(200).json(data);
  });
}

