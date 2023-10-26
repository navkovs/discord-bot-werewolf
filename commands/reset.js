// reset.js
// Resets a round of werwolf by giving everyone the "living" role.
// Also removes the [dead] tag infront of player names.
const
{
    role_dead,
    role_mayor,
    role_night,
    role_gm,
    channel_main,
    channel_werwolf,
} = require('../config.json');
const fn_nickname = require('../functions/fn_nickname.js');
const fn_random = require('../functions/fn_random.js');
module.exports = {
    name: 'reset',
    description: 'Resets a round of Werwolf by restoring everyones role to default.',
    aliases: ['restart', 'resetgame'],
    args: false,
    guildOnly: true,
    run: async (bot, message) =>
    {
        const dead = await message.guild.roles.cache.find(r => r.name === role_dead);
        const mayor = await message.guild.roles.cache.find(r => r.name === role_mayor);
        const night = await message.guild.roles.cache.find(r => r.name === role_night);
        const gm = await message.guild.roles.cache.find(r => r.name === role_gm);
        if (!dead || !mayor || !night || !gm)
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

        // Everyone who is dead will be revived.
        try
        {
            await message.guild.members.cache.filter(m => m.roles.cache.has(dead.id)).forEach(async member =>
            {
                // Remove Mute role.
                await member.roles.remove(dead.id);
                await fn_nickname.setNickname(bot, message, member, false, '[Dead]');
                if (member.voice.channelID === firstChannel.id)
                {
                    await member.voice.setChannel(firstChannel);
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

        // If someone still is in night mode for whatever reason, also bring
        // them back to normal.
        try
        {
            await message.guild.members.cache.filter(m => m.roles.cache.has(night.id)).forEach(async member =>
            {
                // Remove Mute role.
                await member.roles.remove(night.id);
                await fn_nickname.setNickname(bot, message, member, false, '[zZz]');
                if (member.voice.channelID === firstChannel.id)
                {
                    await member.voice.setChannel(firstChannel);
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

        // If someone was not dead but was the mayor, the role has to be removed
        // seperatly.
        try
        {
            await message.guild.members.cache.filter(m => m.roles.cache.has(mayor.id)).forEach(async member =>
            {
                await member.roles.remove(mayor.id);
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

        // Don't remove GM role.
        /*
        try
        {
            await message.guild.members.cache.filter(m => m.roles.cache.has(gm.id)).forEach(async member =>
            {
                await member.roles.remove(gm.id);
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }
        */

        const channel = await message.guild.channels.cache.find(c => c.name === channel_werwolf);
        if (channel)
        {
            try
            {
                channel.delete();
            }
            catch (error)
            {
                console.error('[ERROR]:', error);
            }
        }

        // Print something nice.
        const arr_bad = [':skull:', ':skull_crossbones:', ':brain:', ':bone:', ':vampire:', ':bat:', ':wolf:', ':wolf:', ':wolf:', ':wolf:', ':wolf:', ':wolf:', ':wolf:', ':broken_heart:', ':drop_of_blood:'];
        const arr_good = [':mage:', ':woman_mage:', ':man_mage:', ':mage:', ':woman_mage:', ':man_mage:', ':turtle:', ':mag:', ':crossed_swords:', ':archery:', ':cupid:', ':cupid:'];
        await message.channel.send(`:\n########################\n  ${arr_bad[await fn_random.genRandomNumber(0, arr_bad.length - 1)]} **The Game has been reset!**  ${arr_good[await fn_random.genRandomNumber(0, arr_good.length - 1)]}\n########################`);
    },
};
