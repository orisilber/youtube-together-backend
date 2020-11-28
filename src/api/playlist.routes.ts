import express from "express";
import {
  getPlaylist,
  addVideo,
  removeVideo,
} from "../services/playlist.service";
import { RequestWithIo } from "../types/socketIo.types";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const playlist = await getPlaylist();
    res.json(playlist);
  } catch {
    res.status(500).send();
  }
});

router.post("/video", async (req: RequestWithIo, res) => {
  const { url } = req.body;
  try {
    const video = await addVideo(url);
    req.app.io.emit("VIDEO_ADDED", JSON.stringify(video));
    res.status(200).send();
  } catch {
    res.status(400).send();
  }
});

router.delete("/video", async (req: RequestWithIo, res) => {
  const { uid } = req.body;
  try {
    await removeVideo(uid);
    req.app.io.emit("VIDEO_REMOVED", uid);
    res.status(200).send();
  } catch {
    res.status(400).send();
  }
});

export default router;
