// gm.js
const
{
    role_gm,
} = require('../config.json');
module.exports = {
    name: 'gm',
    description: 'Gives a player the gm role.',
    args: true,
    usage: '<player1>',
    guildOnly: true,
    run: async (bot, message) =>
    {
        const gm = await message.guild.roles.cache.find(r => r.name === role_gm);
        if (!gm)
        {
            console.log('[ERROR] Could not find Role.');
            return;
        }

        try
        {
            await message.mentions.users.forEach(async user =>
            {
                const member = await message.guild.member(user);
                // Toggle GM role.
                if (member.roles.cache.has(gm.id))
                {
                    await member.roles.remove(gm.id);
                }
                else
                {
                    await member.roles.add(gm.id);
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

    },
};
