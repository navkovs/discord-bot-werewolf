// setup.js
const
{
    channel_dead,
    channel_main,
    channel_text,
    channel_category,
    channel_cmd,
    role_dead,
    role_gm,
    role_mayor,
    role_night,
} = require('../config.json');

const fn_createChannel = require('../functions/fn_createChannel.js');
// const fn_sleep = require('../functions/fn_sleep.js');

async function fn_createProhibitedRole(message, role_name, color, isProhibited)
{
    // Check if role already exists.
    let role = message.guild.roles.cache.find(r => r.name === role_name);
    // If Role already exists, delete it to prevent duplication of roles.

    if (role)
    {
        try
        {
            role.delete();
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }
    }

    // Create the role.
    try
    {
        role = await message.guild.roles.create(
        {
            data:
            {
                name: role_name,
                color: color,
                permissions: [],
            },
        });
        // If the users that have this role should not be able to speak in
        // certain channels, put the channels into the filter.
        // It is then checked if the channel is a text or voice channel and
        // depending on the outcome, the necessary permissions are set.
        if (isProhibited)
        {
            message.guild.channels.cache.filter(c => c.name === channel_main || c.name === channel_text).forEach(async channel =>
            {
                if (channel.type === 'text')
                {
                    // console.log(channel);
                    await channel.updateOverwrite(role,
                    {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                }
                if (channel.type === 'voice')
                {
                    // console.log(channel);
                    await channel.updateOverwrite(role,
                    {
                        SPEAK: false,
                    });
                }
            });
        }

        if (role_name == role_gm)
        {
            try
            {
                role.edit({
                    permissions: ['MANAGE_NICKNAMES'],
                });
            }
            catch (error)
            {
                console.error('[ERROR]:', error);
            }
        }
    }
    catch (error)
    {
        console.error('[ERROR]:', error);
    }
}

module.exports = {
    name: 'setup',
    description: 'Setup roles for a server. Only has to be used once.',
    aliases: ['setuproles', 'setup_roles', 'set_start', 'set_default'],
    guildOnly: true,
    run: async (bot, message) =>
    {
        const category = await message.guild.channels.cache.find(c => c.name === channel_category);
        // If channel already exists, delete it to prevent duplication of channels.
        if (!category)
        {
            await message.guild.channels.create(channel_category,
            {
                type: 'category',
            });
        }

        // Setup the game master role.
        await fn_createProhibitedRole(message, role_gm, '#1F8B4C', false);
        // Setup the mayor role.
        await fn_createProhibitedRole(message, role_mayor, '#E67E22', false);
        // Setup the dead role. Delete it if it exists and create a new dead role.
        await fn_createProhibitedRole(message, role_dead, '#882D22', true);
        // Setup night role. If it exists, delete it and create a new night role.
        await fn_createProhibitedRole(message, role_night, '#206694', true);

        await fn_createChannel.createHiddenTextChannel(bot, message, channel_cmd, channel_category, role_gm);
        await fn_createChannel.createChannel(bot, message, channel_main, channel_category, 'voice');
        await fn_createChannel.createChannel(bot, message, channel_dead, channel_category, 'voice');
        await fn_createChannel.createChannel(bot, message, channel_text, channel_category, 'text');
    },
};
