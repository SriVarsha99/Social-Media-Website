import { db } from "../connect.js";

export const requests =(req,res)=>{
    const q = "select u.user_id, u.name from friends f, user u where u.user_id = f.user_id_1 and f.user_id_2 = '1' and f.status = 'Request Sent';";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    //console.log(data);
    res.status(200).json(data);
  });
}

export const accept =(req,res)=>{
  const q = "UPDATE friends SET status = 'Request Accepted' where user_id_1 = ? and user_id_2 = ?";
  db.query(q, [req.body.user_id_1, req.body.user_id_2], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    res.status(200).json({});
  });
}

export const decline =(req,res)=>{
  const q = "DELETE from friends WHERE user_id_1 = ? AND user_id_2 = ?";
  db.query(q, [req.body.user_id_1, req.body.user_id_2], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    res.status(200).json({});
  });
}

export const status = (req, res) => {
  const q = "select f.status from friends f where f.user_id_1 = ? and f.user_id_2 = ?;"
  db.query(q, [req.body.user_id_1, req.body.user_id_2], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    res.status(200).json(data);
  });
}

export const follow = (req, res) => {
  const q = "INSERT INTO friends(user_id_1, user_id_2, status) VALUES (?, ?,'Request Sent');"
  db.query(q, [req.body.user_id_1, req.body.user_id_2], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    res.status(200).json(data);
  });
}