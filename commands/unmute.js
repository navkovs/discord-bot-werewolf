// unmute.js
// Revives a dead player and removes the [dead] tag infront of
// their name.
// Roles have to be fitted to the server.
const
{
    role_dead,
    channel_main,
    channel_werwolf,
} = require('../config.json');
const fn_nickname = require('../functions/fn_nickname.js');
module.exports = {
    name: 'unmute',
    description: 'Unmutes a player.',
    aliases: ['u', 'revive'],
    args: true,
    usage: '<player1>',
    guildOnly: true,
    run: async (bot, message) =>
    {
        const dead = await message.guild.roles.cache.find(r => r.name === role_dead);
        const firstChannel = await message.guild.channels.cache.find(r => r.name === channel_main);
        if (!dead || !firstChannel)
        {
            console.log('[ERROR] Could not find Channel.');
            return;
        }

        try
        {
            await message.mentions.users.forEach(async user =>
            {
                const member = await message.guild.member(user);
                if (member.roles.cache.has(dead.id))
                {
                    await member.roles.remove(dead.id);
                    await fn_nickname.setNickname(bot, message, member, false, '[Dead]');
                    if (member.voice.channelID === firstChannel.id)
                    {
                        await member.voice.setChannel(firstChannel);
                    }

                    const channel = await message.guild.channels.cache.find(c => c.name === channel_werwolf);
                    if (channel)
                    {
                        await channel.updateOverwrite(member.id,
                        {
                            SEND_MESSAGES: true,
                        });
                    }
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }
    },
};
