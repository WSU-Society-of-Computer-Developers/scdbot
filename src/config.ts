import type { RoleData } from "discord.js";
import { PermissionFlagsBits } from "discord.js";

const University = { name: "Wayne State Unversity", url: "https://wayne.edu" };

export const Roles: Record<string, RoleData> = {
  EVERYONE: {
    permissions: [],
  },
  VERIFIED: {
    name: "Members",
    color: "Blue",
    permissions: [
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.Connect,
      PermissionFlagsBits.Speak,
      PermissionFlagsBits.SendMessagesInThreads,
    ],
  },
};

export const Errors = {
  VERIFICATION_FAILED: `Verification failed, please enter a valid access ID... (e.g. \`hh3509\`)`,
  VERIFICATION_TIMEOUT: `Verification timed out, you must re-join the server again...`,
  VERIFICATION_UNKNOWN: `An unknown error occurred, you must re-join the server again...`,
  GUILD_NOT_FOUND: `Guild not found (GUILD_ID is invalid)...`,
};

export const Messages = {
  VERIFICATION_INIT: `Welcome to the server! Please verify you're a student to ${University.name} by entering your access ID. (e.g. \`hh3509\`). You can find your access ID by viewing your OneCard __(This prompt will expire in 5 minutes)__.`,
};
