import redisClient from "./redis.model";
import Video from "./video.model";

export const playlistName = "playlist";

class Playlist {
  static async getAllVideos() {
    const playlist = await redisClient.lrange(playlistName, 0, -1);
    return playlist.map(Video.fromRedisStore);
  }

  /**
   * Remove from redis list
   * @returns {boolean} Did remove
   */
  static async removeVideo(videoUid: string): Promise<boolean> {
    const didRemove = await redisClient.lrem(playlistName, 1, videoUid);
    return !!didRemove;
  }

  /**
   * Add to redis list
   */
  static async addVideo(video: Video): Promise<void> {
    if (!video.isValid) throw Error("Video url invalid");
    await redisClient.rpush(playlistName, video.uid);
  }
}

export default Playlist;
