const methods = {
    createHiddenTextChannel: async function (bot, message, channel_name, channel_category, role_gm)
    {
        channel_name = channel_name.toLowerCase();
        // Check if channel already exists.
        let channel = await message.guild.channels.cache.find(c => c.name === channel_name);
        // If channel already exists, delete it to prevent duplication of channels.
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

        const category = await message.guild.channels.cache.find(c => c.name === channel_category);
        const gm = await message.guild.roles.cache.find(r => r.name === role_gm);

        try
        {
            channel = await message.guild.channels.create(channel_name,
            {
                type: 'text',
                mentionable: false,
                parent: category,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: bot.user.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: gm.id,
                        allow: ['VIEW_CHANNEL'],
                    },

                ],
            });

            if (message.mentions.users)
            {
                await message.mentions.users.forEach(async user =>
                {
                    await channel.updateOverwrite(user.id,
                    {
                        VIEW_CHANNEL: true,
                    });
                });
            }

        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

    },

    createChannel: async function (bot, message, channel_name, channel_category, channelType)
    {
        if (channelType === 'text')
        {
            channel_name = channel_name.toLowerCase();
        }

        // Check if channel already exists.
        let channel = await message.guild.channels.cache.find(c => c.name === channel_name);
        // If channel already exists, delete it to prevent duplication of channels.
        if (channel)
        {
            return;
        }

        const category = await message.guild.channels.cache.find(c => c.name === channel_category);
        try
        {
            channel = await message.guild.channels.create(channel_name,
            {
                type: channelType,
                mentionable: true,
                parent: category,
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

    },

};
module.exports = methods;
