const redis = require("redis");

// const redisUrl = "redis://redis:6379";

const redisClient = redis.createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
  process.exit(1);
});

redisClient.on("connect", async () => {
  console.log("Connected to Redis");
});

async function initializeRedis() {
  await redisClient.connect();
}

module.exports = { redisClient, initializeRedis };
