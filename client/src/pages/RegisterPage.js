import React, { useState } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const [navigate, setNavigate] = useState(false);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const submitForm = async (values) => {
    await axios.post("register", values);
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <TextInput
          required
          label="Username"
          type="text"
          placeholder="johndoe"
          {...form.getInputProps("username")}
        />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          required
          label="Password"
          type="password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default RegisterPage;
