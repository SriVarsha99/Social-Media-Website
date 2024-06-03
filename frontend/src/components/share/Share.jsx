import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import axios from "axios";

export default function Share() {
  const handleShare = () => {
    const content = document.getElementById("shareInput").value; // Get the post content from the input field
    const user_id = localStorage.getItem('user_id'); // Get the user ID of the logged-in user
    console.log(content, user_id);

    axios.post("http://localhost:8800/api/posts/share", { content, user_id }, { withCredentials: true })
      .then(response => {
        console.log("Post shared successfully");
        window.location.reload();
        // Add any additional logic here if needed
      })
      .catch(error => {
        console.error("Error sharing post: ", error);
      });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            id="shareInput"
            placeholder="What's in your mind?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                
            </div>
            <button className="shareButton" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}