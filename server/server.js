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
    user: userExist.email,
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

app.get("/refresh", async (req, res) => {
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

app.listen(3001, () => console.log("listening on port 3000"));

// ROUTES
// app.post("/", async (req, res) => {
//   const { username, email, password } = req.body;

//   const newUser = await prisma.user.create({
//     data: {
//       username,
//       email,
//       password,
//     },
//   });

//   res.status(200).json(newUser);
// });

// app.get("/", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.status(200).json(users);
// });

// app.put("/", async (req, res) => {});

// app.delete("/:id", async (req, res) => {});
