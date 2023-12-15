import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

// Populate the environmental variables
dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!!!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("Claimed");
    console.log("Generating image...");

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    if (aiResponse) {
      const image = aiResponse.data[0].b64_json;
      console.log("Complete");
      res.status(200).json({ photo: image });
    } else {
      console.log("Generating image Failed!");
      res.status(500);
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data.error.message);
  }
});

export default router;
