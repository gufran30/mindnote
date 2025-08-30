import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { configDotenv } from "dotenv";
configDotenv();

// create a ratelimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "10 s"),
});
 
export default ratelimit;
