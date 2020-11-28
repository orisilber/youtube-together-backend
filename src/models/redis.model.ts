import redis from "redis";
import { promisify } from "util";

type AsyncRedisGetter = <T = string>(key: string) => Promise<T>;
type AsyncRedisSetter = <T = any>(key: string, value: string) => Promise<T>;
type AsyncRedisLREM = (key: string, count: number, value: string) => Promise<number>;
type AsyncRedisLRANGE = (key: string, start: number, stop: number) => Promise<string[]>;

export const client = redis.createClient();

export default {
  get: promisify(client.get).bind(client) as AsyncRedisGetter,
  set: promisify(client.set).bind(client) as AsyncRedisSetter,
  lrange: promisify(client.lrange).bind(client) as AsyncRedisLRANGE,
  llen: promisify(client.llen).bind(client) as AsyncRedisGetter,
  lrem: promisify(client.lrem).bind(client) as AsyncRedisLREM,
  rpush: promisify(client.rpush).bind(client) as AsyncRedisSetter,
};
