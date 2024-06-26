import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
 
  const q = "SELECT * FROM user WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    if (data.length) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const insertQuery = "INSERT INTO user (name, email, dob, username, password,gender,address,phone_num) VALUES (?, ?, ?, ?, ?,?,?,?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.dob,
      req.body.username,
      hashedPassword,
      req.body.gender,
      req.body.address,
      req.body.phone,
    ];
    db.query(insertQuery, values, (err, data) => {
      if(err){
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: "User already exists!" });
      }
      console.error("Error inserting new user:", err); 
      return res.status(500).json({ message: "Failed to create user", error: err });
    }
    return res.status(200).json({ message: "User has been created." });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ message: "Internal server error", error: err });
    if (data.length === 0) return res.status(404).json({ message: "User not found!" });

    // Compare the password using bcrypt
    const isPasswordValid = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password or username!" });
    }

    const token = jwt.sign({ user_id: data[0].user_id }, "secretkey");
    const { password, ...others } = data[0];
    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(others);
  });
};

// export const login = (req, res) => {
//   const q = "SELECT * FROM user WHERE username = ?";

//   db.query(q, [req.body.username], (err, data) => {
//     if (err) return res.status(500).json({ message: "Internal server error", error: err });
//     if (data.length === 0) return res.status(404).json({message:"User not found!"});

//     // const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

//     // if (!checkPassword) return res.status(400).json({message:"Wrong password or username!"});
//     if (req.body.password !== data[0].password) {
//       return res.status(400).json({message:"Wrong password or username!"});
//     }
//     const token = jwt.sign({ user_id: data[0].user_id }, "secretkey");
//     const { password, ...others } = data[0];
//     res.cookie("accessToken", token, {
//         httpOnly: true,
//       }).status(200).json(others);
//   });
// };

export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};

export const getDataById = (req, res) => {
  const user_id = req.body.user_id; // Extract user_id from the request body
  const query = "SELECT name,dob ,gender,email,age,address FROM user WHERE user_id = ?";

  db.query(query, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Error fetching user data", error: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found for the given ID" });
    }

    const userName = data[0].name;
    res.status(200).json(data[0]);
  });
};


export const getFriendsById = (req, res) => {
  const user_id = req.body.user_id; // Extract user_id from the request body
  const query = "SELECT u.name FROM user u where u.user_id in (select user_id_2 from friends where status= 'Request Accepted' and user_id_1 = ?)";

  db.query(query, [user_id], (err, data) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Error fetching user data", error: err });
    }
    if (data.length === 0) {
      return res.status(200).json([]); 
    }
    res.status(200).json(data); 
  });
};
