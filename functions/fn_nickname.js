const methods = {
    // setNickname is a funtion that takes the following params:
    // - Bot
    // - message
    // - member
    // - shouldBeDead [Bool]: if the member should have the prefix or not.
    // - newPrefix [String]: new Prefix
    setNickname: async function (bot, message, member, shouldHave, newPrefix)
    {
        // Puts/Removes [Dead] infront of a Nickname.
        const memberNicknameSlice = member.displayName.slice(0, newPrefix.length);
        const memberRest = member.displayName.slice(newPrefix.length + 1);

        if (shouldHave == true)
        {
            if (memberNicknameSlice === newPrefix)
            {
                return;
            }

            if (newPrefix === '[Dead]' && memberNicknameSlice === '[zZz] ')
            {
                await member.setNickname(`${newPrefix} ${member.displayName.slice(newPrefix.length)}`);
                return;
            }

            try
            {
                await member.setNickname(`${newPrefix} ${member.displayName}`);
            }
            catch (error)
            {
                return;
            }
        }
        else
        {
            if (memberNicknameSlice != newPrefix)
            {
                return;
            }

            try
            {
                await member.setNickname(memberRest);
            }
            catch (error)
            {
                console.error('[ERROR]:', error);
                return;
            }
        }


    },
};
module.exports = methods;
