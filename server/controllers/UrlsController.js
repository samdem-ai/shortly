import { nanoid } from "nanoid";
import Urls from "../models/UrlsModel.js";

export const AddUrl = async (req, res, next) => {
  const uid = nanoid(8);
  const userId = req.userId;
  const { url } = req.body;
  const createdUrl = await Urls.create({
    originalUrl: url,
    userId,
    shortenedUrl: uid,
  });

  return res.status(201).json(createdUrl);
};

export const redirectUrl = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const url = await Urls.findOne({ shortenedUrl: slug });
    if (url) {
      return res.redirect(url.originalUrl);
    }
    return res.status(404).send("requested Url not found");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getAllUrls = async (req, res, next) => {
  try {
    const userId = req.userId;
    const UsersUrls = await Urls.find({ userId }).sort({ createdAt: 1 });
    if (UsersUrls) {
      return res.status(200).json({ urls: UsersUrls });
    }
    return res.status(404).send("no Urls found for this user");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server Error");
  }
};
