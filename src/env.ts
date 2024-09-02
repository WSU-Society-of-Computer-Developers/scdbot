import dotenv from "dotenv";

dotenv.config();

// do env validations here

if (
  !process.env.DISCORD_TOKEN ||
  !process.env.DISCORD_CLIENT_ID ||
  !process.env.GUILD_ID ||
  !process.env.ROLE_ID ||
  !process.env.PROMPT_TIMEOUT
) {
  throw new Error(
    "Missing environment variables. Please copy from .env.example"
  );
}

if (isNaN(parseInt(process.env.PROMPT_TIMEOUT))) {
  throw new Error("PROMPT_TIMEOUT must be a number.");
}

if (process.env.PROMPT_TIMEOUT === "0") {
  throw new Error("PROMPT_TIMEOUT must be greater than 0.");
}

if (
  !process.env.SMTP_SERVER ||
  !process.env.SMTP_PORT ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS ||
  !process.env.SMTP_SENDER
) {
  throw new Error(
    "Missing SMTP environment variables. Please copy from .env.example"
  );
}

if (isNaN(parseInt(process.env.SMTP_PORT))) {
  throw new Error("SMTP_PORT must be a number.");
}

if (process.env.SMTP_PORT === "0") {
  throw new Error("SMTP_PORT must be greater than 0.");
}

if (!process.env.SMTP_SENDER.includes("@")) {
  throw new Error("SMTP_SENDER must be a valid email address.");
}
const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
  ROLE_ID: process.env.ROLE_ID,
  PROMPT_TIMEOUT: parseInt(process.env.PROMPT_TIMEOUT),
  SMTP_SERVER: process.env.SMTP_SERVER,
  SMTP_PORT: parseInt(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_SENDER: process.env.SMTP_SENDER,
};

export default env;
