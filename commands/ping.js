// ping.js
// Debug tool to see if commands are accepted.
const fn_ping = require('../functions/fn_ping.js');
module.exports = {
    name: 'ping',
    description: 'Says ping! Implemented for debugging.',
    args: false,
    guildOnly: false,
    run: async (bot, message) =>
    {
        fn_ping.ping(bot, message);
    },
};
