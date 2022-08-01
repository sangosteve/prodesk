import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Select,
  Textarea,
  TextInput,
  Menu,
  Button,
  Text,
} from "@mantine/core";
import {
  FiMoreVertical,
  FiCornerUpLeft,
  FiPaperclip,
  FiSmile,
  FiLink,
} from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import CommentCard from "../components/CommentCard";

const TicketViewPage = () => {
  const [ticket, setTicket] = useState({});
  const [agents, setAgents] = useState([]);
  const [commentTypes, setCommentTypes] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentTypeId, setCommentTypeId] = useState("");
  const [ticketComments, setTicketComments] = useState([]);
  let { id } = useParams();
  const { auth } = useContext(AuthContext);

  const getAgents = async () => {
    const response = await axios.get("agents");
    setAgents(response.data);
  };

  const getTicketDetails = async () => {
    const response = await axios.post(`ticket?id=${id}`);
    setTicket(response.data);
    setTicketComments(response.data.comments);
  };

  const getCommentTypes = async () => {
    const response = await axios.get(`comment_types`);

    setCommentTypes(response.data);
  };

  const submitComment = async () => {
    const comment = {
      content: commentText,
      user_id: JSON.parse(auth).id,
      ticket_id: id,
      c_type_id: parseInt(commentTypeId),
    };
    // // console.log(comment);
    const response = await axios.post(`comment`, comment);

    console.log(response.data);
  };
  useEffect(() => {
    // console.log("auth", auth);
    getTicketDetails();
    getAgents();
    getCommentTypes();
  }, [ticketComments]);
  return (
    <div className="w-full flex ">
      {/* {ticket.ticket_id} */}
      <div className="w-1/4 h-screen flex flex-col items-center px-4 border-r border-gray-300 ">
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              type="text"
              placeholder="Your name"
              label="Requester"
              disabled
            />
          </Grid.Col>
          <Grid.Col span={12}>
            {/* <Select
              label="Assignee"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={agents.map((agent) => agent.username)}
            /> */}
            <select placeholder="Assignee">
              {agents.map((agent) => (
                <option value={agent.id}>{agent.username}</option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="Priority"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["Medium", "Low", "High", "Normal"]}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="Followers"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={agents.map((agent) => agent.username)}
            />
          </Grid.Col>
        </Grid>
      </div>
      <div className="w-1/2 h-screen flex flex-col border-r border-gray-300">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-300 flex">
          {/* Header-Left */}
          <div className="w-1/2 flex align-top">
            <div className="w-9 h-9 bg-slate-300 flex items-center justify-center">
              A
            </div>
            <div className="flex flex-col ml-2">
              <span className="text-lg text-slate-900 leading-none font-bold m-0 p-0">
                {ticket.subject}
              </span>
              <small className="text-gray-400">Created by:</small>
            </div>
          </div>
          {/* Header-Right*/}
          <div className="w-1/2 flex items-center justify-end">
            <small className="text-sm text-gray-400 mr-2">20 moments ago</small>

            <FiMoreVertical
              size={24}
              className="text-lg text-gray-400 px-1 py-0.5 hover:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        {/* BODY */}
        <div className="px-4 py-8 flex flex-col h-3/5 overflow-y-auto">
          <div className="text-md text-slate-900 font-normal h-2/3">
            {/* TICKET MESSAGE INFO */}
            <div className="flex flex-col w-full">
              {/* USER AVATAR */}
              <div className="flex w-full">
                <span className="h-9 w-9 bg-slate-200 rounded-3xl"> </span>
                <p className="ml-2 w-3/4">{ticket.description}</p>
              </div>
              <div className="flex flex-col w-full">
                {ticketComments?.map((comment) => (
                  // <div className="flex w-full py-4">
                  //   <span className="h-9 w-9 bg-slate-200 rounded-3xl"></span>
                  //   <p className="ml-2 w-3/4">{comment.content}</p>
                  // </div>
                  <CommentCard
                    user_id={comment.user_id}
                    content={comment.content}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* interaction/reply input box */}
        <div className="h-1/5 border border-gray-300 bg-white hover:border-blue-500 flex flex-col px-4">
          <div className="py-4 flex">
            <button className="flex" onClick={submitComment}>
              <FiCornerUpLeft className="text-gray-400" />
              <small className="font-medium text-slate-900 ml-2">Reply</small>
            </button>
            <select
              onChange={(e) => {
                console.log("select value:", e.target.value);
                setCommentTypeId(e.target.value);
              }}
            >
              {commentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.description}
                </option>
              ))}
            </select>
          </div>
          <textarea
            onChange={(e) => setCommentText(e.target.value)}
            className="h-full bg-transparent border-0 hover:border-0 focus:outline-none resize-none"
          ></textarea>
          <div className="py-4 flex">
            <button className="p-2 rounded hover:bg-slate-200 text-gray-500 mr-1">
              <FiPaperclip size={18} />
            </button>
            <button className="p-2 rounded hover:bg-slate-200 text-gray-500 mr-1">
              <FiLink size={18} />
            </button>
            <button className="p-2 rounded hover:bg-slate-200 text-gray-500 mr-1">
              <FiSmile size={18} />
            </button>

            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketViewPage;
