import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  // // ADD THIS LINE TO SEE EVERY REQUEST
  // console.log(`Rate limiter processing: ${req.method} ${req.originalUrl}`);

  try {
    const { success } = await ratelimit.limit("my-limit-key");
    // const { success } = await ratelimit.limit(userID);

    if (!success) {
      return res.status(429).json({
        msg: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.log("--- Rate limit error --->", error);
    next(error);
  }
};

export default rateLimiter;
