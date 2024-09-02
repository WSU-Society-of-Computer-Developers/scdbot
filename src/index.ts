import {
  Client,
  Events,
  Collection,
  PermissionFlagsBits,
  Role,
  GuildMember,
} from "discord.js";
import { Errors, Messages, Roles } from "./config";
import fs from "fs";
import WSU from "./WSU";
import env from "./env";
const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildModeration",
    "DirectMessages",
    // "MessageContent",
    "DirectMessageReactions",
    "GuildMessageReactions",
  ],
});
const wsu = new WSU();

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client?.user?.tag}`);
});

client.on(Events.GuildMemberAdd, async (member) => {
  if (member.user.bot) return;

  if (!member.dmChannel) {
    await member.createDM();
  }
  const file = fs.readFileSync(__dirname + "/democard.png");

  await member.send({
    content: Messages.VERIFICATION_INIT,
    files: [
      {
        attachment: file,
        name: "card.png",
      },
    ],
  });

  console.log(`Sent captcha to ${member.user.tag}`);
  const filter = (msg: any) => msg.author.id === member.id;

  const collector = member?.dmChannel?.createMessageCollector({
    filter,
    time: env.PROMPT_TIMEOUT * 60 * 1000,
  }); // 5 minutes

  console.log(`Created collector for ${member.user.tag}`);
  if (!collector) {
    await member.send(Errors.VERIFICATION_FAILED);
    return;
  }

  collector.on("collect", async (msg) => {
    console.log(`Collected message from ${msg.author.tag}: ${msg.content}`);
    try {
      const student = await wsu.lookup(msg.content);
      await member.send(
        `Name: ${student.name}\nEmail: ${student.email}\nMajor: ${student.major}`
      );
      const guild = client.guilds.cache.get(env.GUILD_ID);
      if (!guild) return;
      // TODO: update @everyone role
      let role = guild.roles.cache.get(env.ROLE_ID);
      if (!role) {
        role = await guild.roles.create(Roles.VERIFIED);
      }
      // change member's nickname to their name
      await guild?.members.cache.get(member.id)?.setNickname(student.name);

      let addRole = async (role: Role) =>
        await guild?.members.cache.get(member.id)?.roles.add(role);
      await addRole(role);

      // add extra roles
      for (const role of [student.dept, student.major]) {
        if (!role) continue; // incase my filtering screws up
        let newRole = guild.roles.cache.find((r) => r.name === role);
        if (!newRole) {
          newRole = await guild.roles.create({
            name: role,
          });
        }
        await addRole(newRole);
      }

      await member.send(
        "Verification successful! You now have access to the server."
      );
      collector.stop();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      await member.send(err.message);
    }
    // if (msg.content === captcha) {
    //   const guild = client.guilds.cache.get(GUILD_ID);
    //   if (!guild) return;
    //   const role = guild.roles.cache.get(ROLE_ID);
    //   if (role) {
    //     await member.roles.add(role);
    //     await member.send(
    //       "Verification successful! You now have access to the server."
    //     );
    //   } else {
    //     await member.send(Errors.VERIFICATION_UNKNOWN);
    //   }
    //   collector.stop();
    // } else {
    //   await member.send(Errors.VERIFICATION_FAILED);
    //   collector.stop();
    // }
  });

  collector.on("end", async (collected, reason) => {
    if (reason === "time") {
      await member.send(Errors.VERIFICATION_TIMEOUT);
      await member.kick(Errors.VERIFICATION_TIMEOUT);
    }
  });
});

client.login(env.DISCORD_TOKEN);
