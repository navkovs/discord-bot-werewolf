// vote.js
// Starts a vote by adding reactions to the names and seeing who gets
// the most votes on their reaction.

// const fn_sleep = require('../functions/fn_sleep.js');

module.exports = {
    name: 'vote',
    description: 'Beginns a vote in Werwolf. Voting is done by pressing one of the reactions of the bot',
    aliases: ['v', 'blame', 'b'],
    args: true,
    usage: '<player1> <player2>',
    guildOnly: true,
    run: async (bot, message, args) =>
    {
        // Create a string and initialize the vote.
        let messageToSend = '__**Abstimmung**__\n';
        // For each argument, assume it is a candidate and thus print them.
        for (let i = 0; i < args.length; ++i)
        {
            try
            {
                messageToSend += `**${i + 1}.** ${args[i]}\n`;
            }
            catch (error)
            {
                console.error('[ERROR]:', error);
            }
        }
        // Sent the message with all the candidates.
        const sentMessage = await message.channel.send(messageToSend);
        // Create an array of numbers. This has to be in the Unicode Emoji style
        // as otherwise Discord will not recognize them and give an error.
        const arr_num = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        // React with the number of emojis suitable or less than 9, since we
        // only have the numbers from one to nine.
        for (let i = 0; i < args.length && i < 9; ++i)
        {
            try
            {
                await sentMessage.react(arr_num[i]);
            }
            catch (error)
            {
                console.error('[ERROR]:', error);
            }
        }
    },
};
