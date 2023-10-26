// gm.js
const
{
    role_mayor,
} = require('../config.json');
module.exports = {
    name: 'mayor',
    description: 'Gives a player the gm role.',
    args: true,
    usage: '<player1>',
    guildOnly: true,
    run: async (bot, message) =>
    {
        const mayor = await message.guild.roles.cache.find(r => r.name === role_mayor);
        if (!mayor)
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
                if (member.roles.cache.has(mayor.id))
                {
                    await member.roles.remove(mayor.id);
                }
                else
                {
                    await member.roles.add(mayor.id);
                }
            });
        }
        catch (error)
        {
            console.error('[ERROR]:', error);
        }

    },
};
