import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";

import { useForm } from "@mantine/form";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
const CreateTicketPage = () => {
  const { auth } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const [ticketPriorities, setTicketPriorities] = useState([]);
  const user = auth;

  const [values, setValues] = useState({
    requester: "",
    subject: "",
    assignee_id: "",
    priority_id: "",
    description: "",
  });
  const handleChange = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });

    // console.log(values);
  };
  const submitTicket = async () => {
    try {
      const response = await axios.post("ticket/new", values);
      console.log(response);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getAgents = async () => {
    const response = await axios.get("agents");
    setAgents(response.data);
  };

  const getPriorities = async () => {
    const response = await axios.get(`priorities`);
    setTicketPriorities(response.data);
  };

  useEffect(() => {
    getAgents();
    getPriorities();
  }, []);
  return (
    <Container>
      <Box p={2}>
        <FormControl>
          <FormLabel>
            <Text fontSize="sm">Requester</Text>
          </FormLabel>
          <Select
            size="sm"
            name="requester"
            value={values.requester}
            onChange={handleChange}
          >
            {agents.map((agent) => (
              <option value={agent.id} key={agent.id}>
                {agent.username}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box p={2}>
        <FormControl>
          <FormLabel>
            <Text fontSize="sm">Subject</Text>
          </FormLabel>
          <Input
            size="sm"
            name="subject"
            value={values.subject}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Box p={2}>
        <FormControl>
          <FormLabel>
            <Text fontSize="sm">Assignee</Text>
          </FormLabel>
          <Select
            size="sm"
            name="assignee_id"
            value={values.assignee_id}
            onChange={handleChange}
          >
            {agents.map((agent) => (
              <option value={agent.id} key={agent.id}>
                {agent.username}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box p={2}>
        <FormControl>
          <FormLabel>
            <Text fontSize="sm">Ticket Priority</Text>
          </FormLabel>
          <Select
            size="sm"
            name="priority_id"
            value={values.priority_id}
            onChange={handleChange}
          >
            {ticketPriorities.map((priority) => (
              <option value={priority.id} key={priority.id}>
                {priority.description}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box p={2}>
        <FormControl>
          <FormLabel>
            <Text fontSize="sm">Description</Text>
          </FormLabel>
          <Textarea
            size="sm"
            name="description"
            placeholder="Here is a sample placeholder"
            value={values.description}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Box p={2}>
        <Button colorScheme="blue" size="sm" onClick={submitTicket}>
          Create Ticket
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTicketPage;
