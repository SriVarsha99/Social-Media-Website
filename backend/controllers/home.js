import { db } from "../connect.js";

export const posts =(req,res)=>{
  const q = "select post_id, user_id, content, post_time, like_count, comment_count from Posts where user_id = '1' order by post_time desc;";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    //console.log(data);
    res.status(200).json(data);
  });
}


export const comments =(req,res)=>{
    const q = "select post_id, text, datetime from comments where post_id = '1' order by datetime desc;";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json({ message: "Internal server error", error: err });
      //console.log(data);
      res.status(200).json(data);
    });
  }

  // add routes to insert to tables later.