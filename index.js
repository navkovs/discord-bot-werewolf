// index.js
// The main index file for a discord bot to help play werwolf.
// Link for Bot to join with Permissions:
// https://discordapp.com/oauth2/authorize?client_id=706814641325473802&scope=bot&permissions=419441744
// Uses discord.js v. 12

const discord = require('discord.js');
const bot = new discord.Client();

const
{
    prefix,
    role_gm,
    role_mayor,
} = require('./config.json');

const
{
    token,
} = require('./token.json');

// Gets the commands from their files in the commands folder.
// Only takes *.js files.
const fs = require('fs');
bot.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// Get time
const today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

// Status notificaiton of the bot in the console to show it is running.
// Only launches when it really is online.
bot.once('ready', () =>
{
    console.log('discord-bot-werewolf  Copyright (C) 2020  Jason S.\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder certain conditions.\n');
    console.log(`[${time}] ${bot.user.username} is on the hunt!\n`);
    // Sets bot activity to get a bit more style.
    bot.user.setActivity('Werwolf');
});

// Does things on user message.
bot.on('message', async message =>
{
    if (message.author.bot)
    {
        return;
    }

    if (!message.content.startsWith(prefix) && message.channel.type !== 'text')
    {
        return message.author.send('You have to start a command with \'!\'.\nWhen you need to get help with the commands, type \'!help\'.');
    }

    if (!message.content.startsWith(prefix))
    {
        return;
    }

    // Only allow user with the role "GM" or "Bürgermeister" to give the bot a command in order to avoid spam.
    // As a safety precaution, also allow myself to give the bot a command.
    /*
    if (!message.member.roles.cache.find(r => r.name === role_gm) && !message.member.roles.cache.find(p => p.name === role_mayor) && message.member.id != 322045483579211777)
    {
        return message.author.send('You have to be the gm or mayor to give the bot a command.');
    }
    */

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get command and if applicable command aliases.
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)
    {
        return;
    }

    // Catches if a guildOnly Command wants to be executed in DMs.
    if (command.guildOnly && message.channel.type !== 'text')
    {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Catch if a command should have arguments and has none/wrong ones.
    if (command.args && !args.length)
    {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage)
        {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // Removes the actual command from the screen so it is a little bit nicer.
    if (message.channel.type === 'text')
    {
        message.channel.bulkDelete('1');
    }

    // Run the command.
    try
    {
        await command.run(bot, message, args);
    }
    catch (error)
    {
        console.error(error);
        message.reply(`there was an error trying to execute \`${command.name}\`!`);
    }
});

process.on('unhandledRejection', error =>
{
    console.error('Unhandled promise rejection:', error);
});


// Actually takes the bot online.
bot.login(token);
