# SCD Bot

![Discord](https://img.shields.io/badge/SCD-Bot-blue?style=for-the-badge&logo=discord)

This is a bot that will be used to verify students who attend WSU in our Discord.

## Explanation

Tons of creeps in the comp sci, so we want to make sure that only students can access our Discord server.

![diagram](/infra/diagram.png)

## Setup

> [!NOTE]
> You must install >= [Node v18](https://nodejs.org/en) to develop.

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Copy the `.env.example` file to `.env` and fill in the values

- You must register a bot with the [Discord Developer Portal](https://discord.com/developers/applications) and get the token + client id.

- For mail verification, you must have a SMTP server. I personally use [AWS SES](https://aws.amazon.com/ses/).

- For `GUILD_ID` and `ROLE_ID`, you must have a Discord server (this bot only works for one server at a time) and a role to assign to verified students. Permissions are configurable in [src/config.ts](src/config.ts).

4. Start the bot

```bash
#build
npm run build

#start
npm run start
```

## TODO

- [ ] Finish verification through email
- [ ] Containerize for prod
- [ ] Add re-trigger command?
  - [ ] Need to rate limit so people cant abuse my mail limits
