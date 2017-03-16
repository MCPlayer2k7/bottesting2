const { GeneralCommand } = _core.Structures.Command;

class BrainfuckCommand extends GeneralCommand {
    constructor() {
        super({
            name: 'brainfuck',
            flags: [
                { flag: 'p', name: 'pointers' },
                { flag: 'i', name: 'input' }
            ],
            aliases: ['bf', 'rainfuck']
        });
    }

    async execute(ctx) {
        await super.execute(ctx);
        if (ctx.input._.length == 0) {
            await this.notEnoughParameters(ctx);
            return;
        }

        try {
            let output = _dep.brainfuck.execute(ctx.input._.join(''), (ctx.input.i || []).join(' '));
            await ctx.send(output.output.length == 0 ? await ctx.decode('generic.nooutput') : await ctx.decode('generic.output', {
                output: `${output.output}${ctx.input.p ? '\n\n[' + output.memory.list.join(', ') + ']\nPointer: ' + output.memory.pointer : ''}`
            }));
        } catch (err) {
            await this.genericError(ctx, err.message);
        }
    }
}

module.exports = BrainfuckCommand;