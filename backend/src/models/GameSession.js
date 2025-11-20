import mongoose from "mongoose";
const { Schema } = mongoose;
import WordSchema from "./Word";

const GameSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameData: {
      baseWord: {
        type: Schema.Types.ObjectId,
        ref: "BaseWord",
        required: true,
      },
      foundWords: [WordSchema],
      totalScore: {
        type: Number,
        default: 0,
        min: 0,
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
      },
      language: {
        type: String,
        enum: ["en", "ru", "es"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameSession", GameSessionSchema);
