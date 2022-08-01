import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const Tickets = () => {
  const navigate = useNavigate();
  const handleCreateTicket = () => {
    navigate("./new", { replace: true });
  };
  const [tickets, setTickets] = useState([]);
  const getTickets = async () => {
    const response = await axios.get("tickets");
    setTickets(response.data);
  };
  useEffect(() => {
    getTickets();
  }, [tickets]);
  return (
    <div className="w-full p-4">
      <div className="w-full p-2 flex items-center justify-between">
        <Button onClick={handleCreateTicket}>Create Ticket</Button>
      </div>
      <Table tickets={tickets} />
    </div>
  );
};

export default Tickets;
