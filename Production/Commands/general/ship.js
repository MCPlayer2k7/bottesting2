const { GeneralCommand } = require('../../../Core/Structures/Command');

class ShipCommand extends GeneralCommand {
    constructor(client) {
        super(client, {
            name: 'ship',
            keys: {
                final: '.final'
            }
        });
    }

    async execute(ctx) {
        if (ctx.input._.length < 2) {
            return await this.notEnoughParameters(ctx);
        }
        let users = [
            await ctx.client.Helpers.Resolve.user(ctx, ctx.input._[0]),
            await ctx.client.Helpers.Resolve.user(ctx, ctx.input._[1])
        ];
        ctx.client.Helpers.Random.shuffle(users);

        let firstPart = users[0].username.substring(0, users[0].username.length / 2);
        let lastPart = users[1].username.substring(users[1].username.length / 2);

        await ctx.decodeAndSend(this.keys.final, {
            name: firstPart + lastPart
        });
    }
}

module.exports = ShipCommand;