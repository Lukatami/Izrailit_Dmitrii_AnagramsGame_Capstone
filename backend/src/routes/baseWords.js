import express from "express";
import BaseWord from "../models/BaseWord.js";
import baseWords from "../data/baseWords.js";

const router = express.Router();

// Get ALL baseWords
router.get("/", async (req, res) => {
  try {
    const baseWords = await BaseWord.find({});
    res.status(200).json(baseWords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get random baseWord for selected lang
router.get("/random/:lang", async (req, res) => {
  try {
    const { lang } = req.params;

    const randomWord = await BaseWord.aggregate([
      { $match: { lang } },
      { $sample: { size: 1 } },
    ]);

    res.status(200).json(randomWord[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST for updating set of basewords
router.post("/upload/data", async (req, res) => {
  try {
    const { wordsByLang } = req.body || {};

    const wordsToAdd = wordsByLang || baseWords;

    let totalAdded = 0;
    const results = {};

    for (const [lang, words] of Object.entries(wordsToAdd)) {
      results[lang] = { added: 0, skipped: 0 };

      for (const word of words) {
        const baseWord = word.trim().toLowerCase();

        const existingWord = await BaseWord.findOne({
          baseWord,
          lang,
        });

        if (!existingWord) {
          await BaseWord.create({ baseWord, lang });
          results[lang].added++;
          totalAdded++;
        } else {
          results[lang].skipped++;
        }
      }
    }

    res.status(201).json({
      message: `Successfully added ${totalAdded} new words`,
      results,
      totalAdded,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
