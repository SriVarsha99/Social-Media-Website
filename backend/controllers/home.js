import { db } from "../connect.js";

export const posts =(req,res)=>{
  
  const q = "select post_id, user_id, content as desc, post_time, like_count, comment_count from Posts where user_id = ? order by post_time desc;";

  // Get the username from request headers!
  db.query(q, [req.headers.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    res.status(200).json(data);
  });
}

export const comments =(req,res)=>{
    const q = "select post_id, text, datetime from comments where post_id = ? order by datetime desc;";
    // Get the username from request headers!
    db.query(q, [req.headers.post_id], (err, data) => {
      if (err) return res.status(500).json({ message: "Internal server error", error: err });
      //console.log(data);
      res.status(200).json(data);
    });
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

  // add routes to insert to tables later.