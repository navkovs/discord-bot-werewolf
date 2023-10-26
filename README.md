# discord-bot-werewolf

## Startup

### Requirements
* **requires** node.js v12 and discord.js v12. discord.js can be installed with `npm install discord.js`
* **requires** config.json which should have a prefix and a token.
* **uses** eslint as a dependency.

### How to run
* Install node.js
* Run `npm install discord.js`
* (Optionally) install eslint `npm install eslint`
* Create config.json (See example-config.json)
* On Windows: run `startBot.bat`
* On Linux: run in Terminal `node .`

### Required Discord Permissions
* `Manage Roles` - Change role of Player. Create new roles needed for game.
* `Manage Channels` - Create additional channels for the werwolves.
* `Manage Nicknames` - Add [Dead] as Prefix to Playername
* `Read Messages` - Combined with `View (Voice) Channel`. Use to get a count of how many people are playing. (Not used yet)
* `Send Messages` - To make Votes
* `Manage Messages` - To remove the command message in order to unclutter the screen.
* `Add Reactions` - To make Votes, voting is done by adding a reaction.
* `View Channel` - Combined with `Read Messages`. (Not used yet)
* `Mute Members` - Mute [Dead] Players. (Not used yet, handeld over roles for now)
* `Move Members` - Move [Dead] Players out of the main channel.

## Commands
The following commands are currently available.
They can be used by typing them into a channel chat or in the DM to the Bot.

* `command` {alternatives} - Explanation
* `args-info` - Debug Tool
* `dice` - Rolls a dice. Depends on the arguments, what kind of dice. E. g. for 2d12 = `!roll 2 12`
* `help` {commands, help} - Gives a help page.
* `mute` {m, kill, k} - Mutes a user by giving a special role.
* `ping` - Debug Tool
* `reset` {r} - Removes all tags and mute roles from everyone.
* `set_day` - Sets the game to day and unmutes everyone in the voice channel.
* `set_night` - Sets the game to night and mutes everyone in the voice channel.
* `setup_roles` - Creates the needed roles to play the game. Cannot create channels at the moment so one has to set them up prior and name them in the config file.
* `unmute` {u, revive} - Debug Tool. Removes mute role from a single person.
* `vote` {v, blame, b} - Prints a vote screen.
* `wiki` {roles} - Prints a mini Wiki.
