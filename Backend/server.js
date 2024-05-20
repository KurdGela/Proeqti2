import express from "express";
import mongoose from "mongoose";

//email-ის მოდელის იმპორტი
import { Email } from "./email.js";

// ვქმნი აპლიკაციას
const app = express();

// შემდეგი ხაზით ექსპრესს ვაძლევ საშუალებას რომ json წაიკითხოს
app.use(express.json());

// ყველა email-ის წამოღება
app.get("/emails", async (req, res) => {
  const emails = await Email.find();

  res.status(200).json({ emails });
});

// მხოლოდ 1 email-ის წამოღება id-ის მიხედვით
app.get("/emails/:id", async (req, res) => {
  const email = await Email.findById(req.params.id);

  if (email) {
    res.status(200).json({ email });
  } else {
    res
      .status(404)
      .json({ message: `Email not found with id ${req.params.id}` });
  }
});

// email-ის შექმნა გაგზავნის დროს
app.post("/emails", async (req, res) => {
  console.log(req.body);

  const newEmail = new Email(req.body);
  await newEmail.save();

  res.status(201).json(newEmail);
});

// server-ს ვრთავ 3000 პორტზე
app.listen(3000, async () => {
  console.log("Server running");
  try {
    // ვუკავშირდები მონგოს
    await mongoose.connect("mongodb://127.0.0.1:27017/mail");
  } catch (error) {
    // რაიმე ერორის შემთხვევაში ეს ერორი კოლსოლში გამომაქვს
    console.log(error);
    process.exit(1);
  }
});
