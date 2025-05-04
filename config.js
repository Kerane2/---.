const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "KΣЯΛПΣ",
    ownerNumber: process.env.OWNER_NUMBER || "24106435809",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Gabon",
    botName: process.env.BOT_NAME || "𝙺𝚎𝚛𝚊𝚗𝚎𝙱𝚘𝚝.",
    exifPack: process.env.EXIF_PACK || "𝙺𝚎𝚛𝚊𝚗𝚎𝙱𝚘𝚝.",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑲𝒆𝒓𝒂𝒏𝒆 𝑷𝒍𝒈",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtsNVljMzRXMFJMcjhPQkQ5bXBmKytDbUJ5bWRzeGZ4cjZrQWluSGVFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnZIUFArODBoZ1JLN0pRYWdaeFBLQmJ5eWtLdm14V3FCSHFtalNJd2Qxcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT2l4cGZmbkhsendYL1dlN0h6cDBMbEYxOVNON3NWL2JoN2NBUWNTdkdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3MC9PVHdEMVpqT3F2SEwybVdGSHdneTdBTm9iM1lDcnNYbW5mVkd6ZVFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JMUp3ak50Q1JuSU1saFplRXdiWFc0NTZINmFxdGxFbnF1bmVSdzIzM1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1JOCtYNDhXcS9WWkluQmlGa0ZFQ3BMc2NUT3RsWEhJTEljbzk4Sm5Xa1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUlLQzFGS2lrSkRIL3N6dHBzd0k2WjM2d3lTdG1uU3ltVXFQMGh3aTlVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWxUSU5ibnVvT0RldWdIL1JieTdqT2VKZHFzOVBVRFZ5WXpiV0lEK3kxND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVKMU5sekZFbUxSUlh6SWl6T2FZV1MzOVJRbmt3WkpSZXFxZWwxYnJ3cnZ6RjAyNlpNckhiOHJFeUVUd1NmN2haUit1L2tOZndpa3liTFF0Zmgzc2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUzLCJhZHZTZWNyZXRLZXkiOiJwVytDRkRNWHFCNGpoNzBqYW5Vc3ROTCsxSFlVbzB5WUY5ODhwSU04VXJJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJTNVlaNUZKQiIsIm1lIjp7ImlkIjoiMjQxMDY0MzU4MDk6N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE2Mjg2MTQxODU0OTQ2ODo3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlQrcHY4QkVOR2czc0FHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidEgwdm5UUCtIWThFa1NBcWgyMGxlTks2VnpkQnNlbWJBOGlnUmtJR1dqVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ3dPZCs4T0x5V0JwZkpvcDZQNldUM01Obng0UDZCcHkveDR0VUhoUGhtSDNEV1lDODhicGlnczdZOERiY0FtcFhDWVN6S0hiNWZtSHRQQ3Y5UVowRHc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik4zcks5eVRzSEh0RDdmOVY3NWF2ZUtFREg5cVkrYmhuUGYrek40YStBczVTdHIrTGJkSjBZcjhPdFlBR05DbS81RDl0WXg0NUowN3VJWFpDZzdNVWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQxMDY0MzU4MDk6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiUjlMNTB6L2gyUEJKRWdLb2R0SlhqU3VsYzNRYkhwbXdQSW9FWkNCbG8xIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDYzNzQ3NTAsImxhc3RQcm9wSGFzaCI6Im5tM0JiIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
