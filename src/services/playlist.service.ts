import Video from "../models/video.model";
import Playlist from "../models/playlist.model";

export const getPlaylist = async () => {
  return await Playlist.getAllVideos();
};

export const addVideo = async (videoUrl: string) => {
  const video = Video.fromUrl(videoUrl);

  if (!video.isValid) throw Error("invalid video url");
  await Playlist.addVideo(video);
  return video;
};

export const removeVideo = async (uid: string) => {
  await Playlist.removeVideo(uid);
};
