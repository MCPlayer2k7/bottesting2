var e = module.exports = {};



e.init = () => {
    
    
    e.category = bu.CommandType.GENERAL;

};
e.requireCtx = require;

e.isCommand = true;
e.hidden = true;
e.usage = 'pls';
e.info = 'Gets messages made by the stupid cat on your guild';

e.execute = async function (msg) {
    if (msg.channel.guild.members.get('103347843934212096')) {
        let max = await r.table('catchat').count().run();
        let position = (await r.table('vars').get('markovpos').run()).varvalue;
        if (!position) {
            position = 0;
        }
        logger.error(max);
        if (max >= 300) {
            var diff = bu.getRandomInt(0, 300) - 150;
            var pos = parseInt(position) + diff;
            if (pos < 0) {
                pos += max;
            }
            if (pos > max) {
                pos -= max;
            }
            logger.error('Getting message at pos', pos);
            let message = await r.table('catchat').orderBy({ index: r.desc('id') }).nth(pos).run();
            var messageToSend = `${message.content} ${message.attachment == 'none' ? '' :
                message.attachment}`;
            e.bot.createMessage(msg.channel.id, `\u200B` + messageToSend);
            r.table('vars').get('markovpos').update({ varvalue: message.id }).run();
        } else {
            e.bot.createMessage(msg.channel.id, `I don't have a big enough sample size.`);
        }
    }
};