import Redis from "ioredis"
import "dotenv/config.js"


//in-memory database -- it store data in ram not hard disk
export const redis = new Redis(process.env.REDIS_URL);
