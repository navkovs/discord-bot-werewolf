// wiki.js
// Prints the most common characters in an embedded text message.
// const discord = require('discord.js');
module.exports = {
    name: 'wiki',
    description: 'Prints the most important rules.',
    aliases: ['roles'],
    args: false,
    guildOnly: false,
    run: async (bot, message) =>
    {
        const wikiEmbed = {
            'title': 'Werwolf Mini-Wiki',
            'color': 1482885,
            'fields': [
                {
                    'name': 'Dorffraktion',
                    'value': '- Amor (Wählt am Anfang des Spiels zwei Personen aus, die dann zusammen als Liebespaar überleben müssen)\n- Hebamme (wählt bestimmt zwei Zwillinge, würde einer getötet werden, stirbt stattdessen ein anderer)\n- Hexe (Hat einen Lebenstrank und einen Todestrank)\n- Jäger (Wenn er stirbt, erschießt er noch eine weitere Person)\n- Reine Seele (Ist Dorfbewohner und von Anfang an allen bekannt)\n- Rotkäppchen (Kann nicht von den Werwölfen getötet werden solange der Jäger lebt)\n- Seher (Kann pro Nacht die Rolle einer Person erfahren)\n- Seher-Lehrling (Wird zum Seher nachdem dieser stirbt)',
                },
                {
                    'name': 'Werwölfe (Gewinnen zusammen als Rudel)',
                    'value': '- Einsamer Wolf (Muss zusätzlich zu den Dorfbewohnern auch alle anderen Werwölfe umbringen)\n- Hexenmeister (Wird als Dorfbewohner gesehen. Darf einmal pro Nacht eine Person verfluchen. Die wird von nun an als Werwolf gesehen)\n- Werwolf (Wachen jede Nacht auf und fressen einen Spieler)\n- Zaubermeisterin (Wird als Dorfbewohner gesehen. Darf einmal pro nacht erfahren ob ein Spieler Seher ist oder nicht)',
                },
            ],
        };
        message.channel.send(
        {
            embed: wikiEmbed,
        });
    },
};
