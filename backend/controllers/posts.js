import { db } from "../connect.js";
import moment from "moment";

export const posts =(req,res)=>{
  
  const q = "select post_id, user_id, content , post_time, like_count, comment_count from Posts where user_id = ? order by post_time desc;";

  // Get the username from request headers!
  db.query(q, [req.body.user_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    //console.log(data);
    res.status(200).json(data);
  });
}

export const feedPosts =(req,res)=>{
  
  //const q = "select p.post_id, p.user_id, p.content , p.post_time, p.like_count, p.comment_count from friends f, posts p where f.user_id_1 = ? and f.user_id_2 = p.user_id order by p.post_time desc;";
  const q = "select p.post_id, p.user_id, p.content , p.post_time, p.like_count, p.comment_count, (select true from likes l where l.user_id = ? and l.post_id = p.post_id ) as liked from friends f, posts p where f.user_id_1 = ? and f.user_id_2 = p.user_id and f.status = 'Request Accepted' order by p.post_time desc;";

  db.query(q, [req.headers.user_id, req.headers.user_id], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    //console.log(data);
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

  export const addLike = (req,res)=>{
    const q = "INSERT INTO likes (`user_id`,`post_id`) VALUES (?);";
    const values = [
      req.headers.user_id,
      req.headers.post_id
    ];
    console.log("handling addLike on post_id" + req.headers.post_id + " by user_id " + req.headers.user_id)

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({"err ": err, "data": data});
        return res.status(200).json("Post has been liked.");
      });
    };

    export const removeLike = (req,res)=>{
      const q = "DELETE FROM likes WHERE user_id =? AND post_id=?";
      console.log("handling removeLike on post_id" + req.headers.post_id + " by user_id " + req.headers.user_id)
  
      db.query(q, [req.headers.user_id, req.headers.post_id], (err, data) => {
        if (err) return res.status(500).json({"err ": err, "data": data});
          return res.status(200).json("Post has been unliked.");
        });
      };

    export const addComment = (req, res) => {
      const q = "INSERT INTO comments(`text`, `datetime`, `user_id`, `post_id`) VALUES (?)";
      const values = [
      req.headers.text,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.headers.user_id,
      req.headers.post_id];
    
      db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created.");
      });
    };


  // add routes to insert to tables later.