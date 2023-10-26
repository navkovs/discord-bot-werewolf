// werwolf.js
const
{
    role_gm,
    channel_werwolf,
    channel_category,
} = require('../config.json');

const fn_createChannel = require('../functions/fn_createChannel.js');

module.exports = {
    name: 'werwolf',
    description: 'Puts someone into the werwolf group.',
    aliases: ['w', 'wolf', 'rudel'],
    args: true,
    usage: '<player>',
    guildOnly: true,

    run: async (bot, message) =>
    {
        await fn_createChannel.createHiddenTextChannel(bot, message, channel_werwolf, channel_category, role_gm);
    },
};
