import React, { useContext } from "react";
import {
  Container,
  Grid,
  Select,
  Textarea,
  Button,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
const CreateTicketPage = () => {
  const { auth } = useContext(AuthContext);

  const user = JSON.parse(auth);
  console.log("user_id:", user.id);
  const form = useForm({
    initialValues: {
      contact: "",
      subject: "",
      description: "",
      assignee_id: user.id,
    },
  });
  const submitTicket = async (values) => {
    try {
      const response = await axios.post("ticket/new", values);
      console.log(response);
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Container size="xs" px={0}>
      <form onSubmit={form.onSubmit((values) => submitTicket(values))}>
        <Grid gutter={8}>
          <Grid.Col span={12}>
            <Select
              label="Contact"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={["React", "Angular", "Svelte", "Vue"]}
              {...form.getInputProps("contact")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              type="text"
              placeholder="Your name"
              label="Subject"
              required
              {...form.getInputProps("subject")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder="Description"
              label="description"
              {...form.getInputProps("description")}
              required
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Button type="submit">Save</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateTicketPage;
