import React, { useContext } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
const Login = ({ setIsAuthenticated }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const submitForm = async (values) => {
    const { data } = await axios.post("login", values, {
      withCredentials: true,
    });

    const user = data.user;
    if (user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
    }
    // localStorage.setItem("user", user);
    //localStorage.removeItem("user");
    //After login, send every request with token in the header
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <TextInput
          required
          type="email"
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

export default Login;
