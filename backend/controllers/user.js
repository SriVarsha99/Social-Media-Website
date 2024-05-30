import { db } from "../connect.js";
export const getUser =(req,res)=>{

}

export const users =(req,res)=>{
    const q = "SELECT * FROM user";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });

    
    res.status(200).json(data);
  });
}