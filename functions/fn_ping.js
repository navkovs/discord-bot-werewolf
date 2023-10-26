const methods = {
    ping: async function (bot, message)
    {
        const m = await message.channel.send(':crystal_ball: Ping test');
        await m.edit(`:ping_pong: Latency: ${m.createdTimestamp - message.createdTimestamp}ms`);
        await message.channel.send(`:ping_pong: API Latency: ${bot.ws.ping}ms `);
    },
};
module.exports = methods;
