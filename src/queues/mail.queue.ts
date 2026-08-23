import { Queue } from "bullmq";
import { redis } from "../config/redis.config.js";

export const mailQueue = new Queue("mail", {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 2000
    },

    removeOnComplete: 100,
    removeOnFail: 500
  }
});