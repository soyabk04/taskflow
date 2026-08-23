import {Redis} from "ioredis";
import { REDIS_URL } from "./env.config.js";

export const redis = new Redis(REDIS_URL!, {
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (error:any) => {
  console.error("Redis error:", error);
});

redis.on("close", () => {
  console.log("Redis connection closed");
});