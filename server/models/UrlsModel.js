import mongoose, { Schema } from "mongoose";
import validator from "validator";

const UrlsSchema = mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please Provide a Url"],
    validator: [validator.isURL, "Provide a valid Url"],
  },
  shortenedUrl: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true],
  },
  createdAt: { type: Date, default: Date.now() },
});

const Urls = mongoose.model("urls", UrlsSchema);

export default Urls;
