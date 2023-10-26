// set_day.js
const
{
    role_night,
    channel_main,
    channel_werwolf,
} = require('../config.json');
const fn_nickname = require('../functions/fn_nickname.js');
const fn_random = require('../functions/fn_random.js');
module.exports = {
    name: 'set_day',
    description: 'Mutes a player.',
    aliases: ['unmall', 'uma', 'reviveall', 'rall', 'day', 'wake', 'tag', 'unmuteall', 'd', 't'],
    args: false,
    guildOnly: true,
    run: async (bot, message) =>
    {
        const night = await message.guild.roles.cache.find(r => r.name === role_night);
        const firstChannel = await message.guild.channels.cache.find(r => r.name === channel_main);
        if (!night || !firstChannel)
        {
            console.log('[ERROR] Could not find Channel.');
            return;
        }

        try
        {
            await message.guild.members.cache.filter(m => m.roles.cache.has(night.id)).forEach(async member =>
            {
                await member.roles.remove(night);
                await fn_nickname.setNickname(bot, message, member, false, '[zZz]');
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

        const arr_sun = [':sunny:', ':sunny:', ':sunny:', ':sun_with_face:', ':white_sun_small_cloud:', ':partly_sunny:', ':white_sun_cloud:', ':white_sun_rain_cloud:'];
        await message.channel.send(arr_sun[await fn_random.genRandomNumber(0, arr_sun.length - 1)]);
    },
};
