const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/career_guidance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username:{type:String,unique:true, required:true},
    fullName:{type:String, required:true},
    mobileNo:{type:Number, required:true }
});
const User = mongoose.model("User", UserSchema);

app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ reply: "Please ask something." });
    }

    const payload = {
      model: process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful and friendly career guidance assistant. Keep responses clear and accurate."
        },
        { role: "user", content: message.trim() }
      ],
      max_tokens: 2000
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Full API Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("API Error:", data);
      return res.status(500).json({ reply: `API Error: ${data.error?.message || "Unknown error"}` });
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || "";
    return reply
      ? res.json({ reply })
      : res.status(500).json({ reply: "Received an empty response from the AI" });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ reply: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
      const { email, password,fullName, username,mobileNo } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword,fullName,mobileNo,username});
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("signup error:",error)
      res.status(500).json({ message: "Server error:"+error.message });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/", (req, res) => {
    res.send("Welcome to Career Guidance API");
});
console.log("DeepSeek API Key:", process.env.OPENROUTER_API_KEY);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
