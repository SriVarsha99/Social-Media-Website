import { db } from "../connect.js";
import moment from "moment";

export const posts =(req,res)=>{
  
  const q = "select post_id, user_id, content , post_time, like_count, comment_count from Posts where user_id = ? order by post_time desc;";

  // Get the username from request headers!
  db.query(q, [req.headers.user_id], (err, data) => {
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

  export const addLike = (req,res)=>{
    const q = "INSERT INTO likes (`user_id`,`post_id`) VALUES (?);";
    const values = [
      req.headers.user_id,
      req.headers.post_id
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
        return res.status(200).json("Post has been liked.");
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

    export const deleteLike = (req, res) => {
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
        db.query(q, [req.headers.user_id, req.headers.postId], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Post has been disliked.");
        });
      };

      export const deleteComment = (req, res) => {
        
          const commentId = req.params.id;
          const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";
      
          db.query(q, [commentId, req.headers.user_id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Comment has been deleted!");
            return res.status(403).json("You can delete only your comment!");
          });
      };

  // add routes to insert to tables later.