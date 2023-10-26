// set_night.js
const
{
    role_admin,
    role_dead,
    role_gm,
    role_night,
    channel_main,
    channel_werwolf,
} = require('../config.json');
const fn_nickname = require('../functions/fn_nickname.js');
const fn_random = require('../functions/fn_random.js');
module.exports = {
    name: 'set_night',
    description: 'Mutes a player.',
    aliases: ['mall', 'ma', 'killall', 'kall', 'night', 'sleep', 'nacht', 'muteall', 'n'],
    args: false,
    guildOnly: true,
    run: async (bot, message) =>
    {
        const admin = await message.guild.roles.cache.find(r => r.name === role_admin);
        const mute = await message.guild.roles.cache.find(r => r.name === role_dead);
        const gm = await message.guild.roles.cache.find(r => r.name === role_gm);
        const night = await message.guild.roles.cache.find(r => r.name === role_night);
        if (!gm || !night)
        {
            console.log('[ERROR] Could not find Role.');
            return;
        }

        const firstChannel = await message.guild.channels.cache.find(r => r.name === channel_main);
        if (!firstChannel)
        {
            console.log('[ERROR] Could not find Channel.');
            return;
        }

        // Add the role 'night' to everyone who is not in the filter.
        try
        {
            await message.guild.members.cache.filter(m =>
                m.voice.channelID === firstChannel.id &&
                !m.roles.cache.has(mute.id) &&
                !m.roles.cache.has(admin.id) &&
                !m.roles.cache.has(gm.id) &&
                !m.user.bot,
            ).forEach(async member =>
            {
                await member.roles.add(night);
                await fn_nickname.setNickname(bot, message, member, true, '[zZz]');
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

            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

        const arr_moon = [':full_moon_with_face:', ':new_moon_with_face:', ':full_moon:', ':waning_gibbous_moon:', ':waning_crescent_moon:', ':waxing_crescent_moon:', ':waxing_gibbous_moon:', ':crescent_moon:'];
        await message.channel.send(arr_moon[await fn_random.genRandomNumber(0, arr_moon.length - 1)]);
    },
};
