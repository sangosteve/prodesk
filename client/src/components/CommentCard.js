import axios from "axios";
import React, { useState, useEffect } from "react";

const CommentCard = ({ user_id, content }) => {
  const [author, setAuthor] = useState(null);

  const getCommentAuthor = async () => {
    const response = await axios.post(`user?id=${user_id}`);
    setAuthor(response.data);
  };

  useEffect(() => {
    getCommentAuthor();
  }, []);
  return (
    //CONTAINER
    <div className="flex w-full  mt-4">
      {/* AVATAR */}
      <div className="w-9 h-9 rounded-full bg-slate-200"></div>
      {/* DETAILS CONTANER */}
      <div className="flex flex-col w-full px-2">
        {/* HEADER CONTAINER */}
        <div className="flex w-full items-start justify-between ">
          <span className="w-2/4 text-sm font-semibold">
            {author ? author.username : ""}
          </span>
          <span className="w-2/4 text-sm text-gray-400 flex items-start justify-end">
            Jul 29 14:23
          </span>
        </div>
        {/* Card Body */}
        <div className="w-full mt-2 text-sm">{content}</div>
      </div>
    </div>
  );
};

export default CommentCard;
