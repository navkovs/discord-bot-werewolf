// dice.js
// Rolls a dice
const fn_random = require('../functions/fn_random.js');
module.exports = {
    name: 'dice',
    description: 'Rolls [amout] number of [eyes] dice. If no arguments are provided, a 1d6 will be used. If only one arguement is provided, a 1d[arg] will be used.',
    aliases: ['roll', 'r'],
    usage: '<amount> <eyes>',
    run: async (bot, message, args) =>
    {
        // If there is no argument, simply roll a 1d6.
        // If there is only one argument, we assume that that is the number of
        // eyes and the user only wanted to roll one die.
        const min = Math.ceil(1);
        let max;
        switch (args.length)
        {
        case 0:
            max = Math.floor(6);
            await message.channel.send(':game_die:: ' + await fn_random.genRandomNumber(min, max));
            break;
        case 1:
            max = Math.floor(args[0]);
            await message.channel.send(':game_die:: ' + await fn_random.genRandomNumber(min, max));
            break;
        default:
            max = Math.floor(args[1]);
            for(let i = 0; i < args[0]; ++i)
            {
                await message.channel.send(':game_die:: ' + await fn_random.genRandomNumber(min, max));
            }
        }
    },
};
