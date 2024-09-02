import type { Client, Guild } from "discord.js";
import { Errors } from "./config";

class Discord {
  private client: Client;
  private guildId: string;
  private roleId: string;
  private guild: Guild;
  constructor(client: Client<boolean>, guildId: string, roleId: string) {
    this.client = client;
    this.guildId = guildId;
    this.roleId = roleId;
    // @ts-expect-error it will be checked
    this.guild = this.client.guilds.cache.get(this.guildId);
    if (!this.guild) {
      throw new Error(Errors.GUILD_NOT_FOUND);
    }
  }

  async addRole(memberId: string, roleId: string) {
    this.guild.members.cache.get(memberId)?.roles.add(roleId);
  }

  async removeRole(memberId: string, roleId: string) {
    this.guild.members.cache.get(memberId)?.roles.remove(roleId);
  }

  async getRole(roleId: string) {
    return this.guild.roles.cache.get(roleId);
  }
}
