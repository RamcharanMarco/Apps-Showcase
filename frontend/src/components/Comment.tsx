import { FC, useState } from "react";
import "../styles/comment.css";
import { useComment } from "../hooks/useComment";
import { IoArrowBackCircleOutline } from "react-icons/io5";

interface AppProps {
  toggleComment: (params: any) => any;
  id: string
}

const Comment: FC<AppProps> = ({ toggleComment,id }) => {
  const { comment } = useComment();

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const handleComment = (e: any) => {
    e.preventDefault();
    comment(name, body, id);
  };

  return (
    <div className="comment">
      <h1>comment</h1>
      <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
          />
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            type="text"
            placeholder="body"
          />
          <button onClick={handleComment}>
            comment
          </button>
        </div>
      <IoArrowBackCircleOutline
        className="cancel"
        onClick={toggleComment}
      />
    </div>
  );
};

export default Comment;
