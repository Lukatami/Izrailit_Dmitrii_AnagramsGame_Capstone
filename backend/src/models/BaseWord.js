import mongoose from "mongoose";
const { Schema } = mongoose;

const BaseWordSchema = new Schema(
  {
    baseWord: { type: String, required: true, trim: true, lowercase: true },
    lang: {
      type: String,
      required: true,
      enum: ["en", "ru", "es"],
    },
  },
  { timestamps: true }
);

BaseWordSchema.index({ lang: 1 });
BaseWordSchema.index({ baseWord: 1, lang: 1 }, { unique: true });

export default mongoose.model("BaseWord", BaseWordSchema);
