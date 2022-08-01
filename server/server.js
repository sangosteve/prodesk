import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const prisma = new PrismaClient();

//REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const checkUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkUser)
    return res.status(401).json({ message: "Account already exits" });

  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  res.status(200).json({ message: "Account created successfully" });
});

//LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!userExist)
    return res.status(401).json({ message: "Those Credentials are incorrect" });

  if (userExist.password !== password)
    return res.status(401).json({ message: "Those Credentials are incorrect" });

  const refreshToken = jwt.sign(
    { id: userExist.id },
    process.env.REFRESH_SECRET,
    {
      expiresIn: "1w",
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });

  const expired_at = new Date();
  expired_at.setDate(expired_at.getDate() + 7);

  await prisma.token.create({
    data: {
      userId: userExist.id,
      token: refreshToken,
      expired_at,
    },
  });

  const token = jwt.sign({ id: userExist.id }, process.env.ACCESS_SECRET, {
    expiresIn: "30s",
  });

  res.status(200).json({
    message: "user logged in successfuly",
    token: token,
    user: userExist,
  });
});

export const AuthenticatedUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";
    console.log("accessToken:", accessToken);
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    if (!payload) return res.status(401).json({ message: "unauthenticated" });

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) return res.status(401).json({ message: "unauthenticated" });

    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: "unauthenticated" });
  }
};

app.get("/protected", AuthenticatedUser, (req, res) => {
  res.status(200).json({ message: "welcome to protected" });
});

app.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    if (!payload) return res.status(401).json({ message: "unauthenticated" });

    //CHECK IF REFRESH TOKEN EXISTS IN THE DATABASE

    const refreshTokenExist = await prisma.token.findMany({
      where: {
        userId: { equals: payload.id },
        expired_at: {
          gte: new Date(),
        },
      },
    });

    if (!refreshTokenExist)
      return res.status(401).json({ message: "unauthenticated" });

    //CREATE ACCESS TOKEN
    const token = jwt.sign({ id: payload.id }, process.env.ACCESS_SECRET, {
      expiresIn: "30s",
    });

    //SEND ACCESS TOKEN
    res.status(200).json({ message: "Refresh Success", token: token });
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: "unauthenticated" });
  }
});

//LOGOUT
app.get("/logout", async (req, res) => {
  //RESET AND CLEAR REFRESH TOKEN
  res.cookie("refreshToken", "", { maxAge: 0 });
  //REVOKE TOKEN FROM DB
  const refreshToken = req.cookies["refreshToken"];
  try {
    await prisma.token.deleteMany({
      where: {
        token: { equals: refreshToken },
      },
    });
    return res.status(200).json({ message: "token revoke successful" });
  } catch (e) {
    res.status(401).json({ message: "unsuccessful" });
  }
});

// TICKETS API
app.get("/tickets", async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({});
    res.status(200).json(tickets);
  } catch (e) {
    res.json({ message: e.message });
  }
});

app.post("/ticket", async (req, res) => {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        ticket_id: req.query.id,
      },
      include: {
        comments: true,
      },
    });

    res.status(200).json(ticket);
  } catch (e) {
    res.send({ message: e.message });
  }
});

app.post("/ticket/new", async (req, res) => {
  try {
    const { subject, description, assignee_id } = req.body;
    const newTicket = await prisma.ticket.create({
      data: {
        subject,
        description,
        assignee_id,
      },
    });

    res
      .status(200)
      .json({ message: "ticket sent successfully", ticket: newTicket });
  } catch (e) {
    res.send({ message: e.message });
  }
});

//USER ENDPOINT
app.post("/user", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.query.id,
      },
      // include: {
      //   comments: true,
      // },
    });

    res.status(200).json(user);
  } catch (e) {
    res.send({ message: e.message });
  }
});

//AGENTS ENDPOINT
app.get("/agents", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).json(users);
  } catch (e) {
    res.json({ message: e.message });
  }
});

//COMMENT ENDPOINT

app.post("/comment", async (req, res) => {
  try {
    console.log(req.body.content);
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        user_id: req.body.user_id,
        ticket_id: req.body.ticket_id,
        c_type_id: req.body.c_type_id,
      },
    });
    res.status(200).send({ message: "comment sent successfully" });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});

//COMMENT_TYPE END POINT
app.get("/comment_types", async (req, res) => {
  try {
    const comment_types = await prisma.ctype.findMany({});
    res.status(200).json(comment_types);
  } catch (e) {
    res.json({ message: e.message });
  }
});
app.listen(3001, () => console.log("listening on port 3000"));
