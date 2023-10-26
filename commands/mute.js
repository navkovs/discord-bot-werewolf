// mute.js
// Mutes a player by giving him the role "Mute".
// Can also be used as a way to "kill" someone in werwolf.
// The role "Mute" has to be changed to whatever the silenced role in
// is named in the end.
const
{
    role_dead,
    channel_main,
    channel_werwolf,
} = require('../config.json');
const fn_nickname = require('../functions/fn_nickname.js');
module.exports = {
    name: 'mute',
    description: 'Mutes a player.',
    aliases: ['m', 'kill', 'k'],
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
                // Add Mute Role.
                if (member.roles.cache.has(dead.id))
                {
                    return;
                }
                await member.roles.add(dead.id);
                await fn_nickname.setNickname(bot, message, member, true, '[Dead]');
                if (member.voice.channelID === firstChannel.id)
                {
                    await member.voice.setChannel(firstChannel);
                }

                const channel = await message.guild.channels.cache.find(c => c.name === channel_werwolf);
                if (channel)
                {
                    await channel.updateOverwrite(member.id,
                    {
                        SEND_MESSAGES: false,
                    });
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

    },
};
