import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  
   // Make backend call here.
  const posts = () => {
    fetch("http://localhost:8800/api/home/posts/",{
      method: 'GET',
      headers: {
        'username': 111,  // Fill the active user rather than hard coded 111
      }
    })
        .then((response) => response.json())
        // .then((json) =>{
        //   setRequests(json);
        // })
        ;
  }

  console.log(posts());

  //TEMPORARY
  const posts2 = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      desc: "Test post"
    }
  ];


  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];

  return <div className="posts">
    {posts2.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
  // return <div className="posts">
  //   {posts().array.forEach(post => {
  //     <Post post={post} key={post.id}/>
  //   })}
  // </div>;
};

export default Posts;




// import "./post.scss";
// //import Comments from "../comments/Comments";
// import { useState } from "react";
// import moment from "moment";
// // import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// // import { makeRequest } from "../../axios";
// // import { useContext } from "react";
// // import { AuthContext } from "../../context/authContext";

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery(["likes", post.id], () =>
//     makeRequest.get("/likes?postId=" + post.id).then((res) => {
//       return res.data;
//     })
//   );

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (liked) => {
//       if (liked) return makeRequest.delete("/likes?postId=" + post.id);
//       return makeRequest.post("/likes", { postId: post.id });
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["likes"]);
//       },
//     }
//   );
//   const deleteMutation = useMutation(
//     (postId) => {
//       return makeRequest.delete("/posts/" + postId);
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );

//   const handleLike = () => {
//     mutation.mutate(data.includes(currentUser.id));
//   };

//   const handleDelete = () => {
//     deleteMutation.mutate(post.id);
//   };

//   return (
//     <div className="post">
//       <div className="container">
//         <div className="user">
//           <div className="userInfo">
//             <img src={"/upload/"+post.profilePic} alt="" />
//             <div className="details">
//               <Link
//                 to={`/profile/${post.userId}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <span className="name">{post.name}</span>
//               </Link>
//               <span className="date">{moment(post.createdAt).fromNow()}</span>
//             </div>
//           </div>
//           <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
//           {menuOpen && post.userId === currentUser.id && (
//             <button onClick={handleDelete}>delete</button>
//           )}
//         </div>
//         <div className="content">
//           <p>{post.desc}</p>
//           <img src={"/upload/" + post.img} alt="" />
//         </div>
//         <div className="info">
//           <div className="item">
//             {isLoading ? (
//               "loading"
//             ) : data.includes(currentUser.id) ? (
//               <FavoriteOutlinedIcon
//                 style={{ color: "red" }}
//                 onClick={handleLike}
//               />
//             ) : (
//               <FavoriteBorderOutlinedIcon onClick={handleLike} />
//             )}
//             {data?.length} Likes
//           </div>
//           <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
//             <TextsmsOutlinedIcon />
//             See Comments
//           </div>
//           <div className="item">
//             <ShareOutlinedIcon />
//             Share
//           </div>
//         </div>
//         {commentOpen && <Comments postId={post.id} />}
//       </div>
//     </div>
//   );
// };

// export default Post;