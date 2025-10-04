import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  // Render / Railway dynamic port birinchi o'rinda ishlatiladi
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
}));
