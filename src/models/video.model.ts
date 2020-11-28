import nanoid from "nanoid";
import { playlistName } from "./playlist.model";
import redisClient, { client } from "./redis.model";

class Video {
  uid: string;
  videoId: string;
  isValid: boolean;

  /**
   * Create Video from youtube url
   * @param {string} videoUrl
   * @returns {Video} Video instance
   */
  static fromUrl(videoUrl: string): Video {
    const video = new Video();
    const videoId = video.getVideoIdFromUrl(videoUrl);
    video.isValid = !!videoId;
    video.videoId = videoId || "";
    video.uid = `${nanoid.nanoid()}/${videoId || ""}`;
    return video;
  }

  /**
   * Transform redis list element to Video
   * @param {string} videoData The data received from redis
   * @returns {Video} Video instance
   */
  static fromRedisStore(videoData: string): Video {
    const video = new Video();
    video.isValid = true;
    video.uid = videoData;
    video.videoId = videoData.split("/")[1];
    return video;
  }

  /**
   * Get youtube video ID from youtube url
   * Returns empty string if link is invalid
   * @param {string} videoUrl youtube video url
   */
  getVideoIdFromUrl(videoUrl: string): string {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = videoUrl.match(regExp);
    return match && match[7].length === 11 ? match[7] : "";
  }
}

export default Video;
