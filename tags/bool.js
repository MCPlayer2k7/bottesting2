/*
 * @Author: stupid cat
 * @Date: 2017-05-07 18:27:16
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-10-12 18:53:46
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = `bool`;
e.args = `&lt;evaluator&gt; &lt;arg1&gt; &lt;arg2&gt;`;
e.usage = `{bool;evaluator;arg1;arg2}`;
e.desc = `Evaluates <code>arg1</code> and <code>arg2</code> using the <code>evaluator</code> and returns <code>true</code> or <code>false</code>. Valid
evaluators are <code>==</code> <code>!=</code> <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>
&gt;=</code> <code>startswith</code> <code>endswith</code><code>includes</code>`;
e.exampleIn = `{bool;&lt;=;5;10}`;
e.exampleOut = `true`;

const operators = {
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b,
    '>=': (a, b) => a >= b,
    '>': (a, b) => a > b,
    '<=': (a, b) => a <= b,
    '<': (a, b) => a < b,
    'startswith': (a, b) => a.toString().startsWith(b),
    'endswith': (a, b) => a.toString().endsWith(b),
    'includes': (a, b) => a.toString().includes(b)
};

e.execute = async function (params) {
    let args = params.args,
        fallback = params.fallback;
    var replaceString = '';
    var replaceContent = false;

    if (args.length > 2) {
        args[1] = await bu.processTagInner(params, 1);
        if (/^-?\d+(\.\d*)?$/.test(args[1])) args[1] = parseFloat(args[1]);
        args[2] = await bu.processTagInner(params, 2);
        if (/^-?\d+(\.\d*)?$/.test(args[2])) args[2] = parseFloat(args[2]);
        args[3] = await bu.processTagInner(params, 3);
        if (/^-?\d+(\.\d*)?$/.test(args[3])) args[3] = parseFloat(args[3]);

        if (operators.hasOwnProperty(args[1])) {
            replaceString = operators[args[1]](args[2], args[3]).toString();
        } else if (operators.hasOwnProperty(args[2])) {
            replaceString = operators[args[2]](args[1], args[3]).toString();
        } else replaceString = await bu.tagProcessError(params, '`Invalid Operator`');
    } else {
        replaceString = await bu.tagProcessError(params, '`Not enough arguments`');
    }

    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};