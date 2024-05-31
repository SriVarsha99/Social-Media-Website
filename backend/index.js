
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { db } from "./connect.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import followRoutes from "./routes/followers.js";
import homeRoutes from "./routes/post.js";
// import commentRoutes from "./routes/comments.js";
// import likeRoutes from "./routes/likes.js";

const app = express();
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//app.use(express.json())
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


// Routes
//app.use("/api/users",userRoutes)

app.use('/api/auth', authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/followers", followRoutes);
app.use("/api/home", homeRoutes);


app.get("/",(req,res) =>{
  res.json("hello this is backend")
})

app.listen(8800, () => {
    console.log("API working!");
  });