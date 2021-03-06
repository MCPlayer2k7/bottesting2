/*
 * @Author: stupid cat
 * @Date: 2017-05-07 19:06:37
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-05-07 19:06:37
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = `trim`;
e.args = `&lt;text&gt;`;
e.usage = `{trim;text}`;
e.desc = `Trims whitespace and newlines before and after the provided text.`;
e.exampleIn = `{trim;    trimmed!    }`;
e.exampleOut = `trimmed!`;


e.execute = async function(params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let args = params.args,
        fallback = params.fallback;
    var replaceString = '';
    var replaceContent = false;
    if (!args[1]) {
        args[1] = '';
    }
    replaceString = args[1].replace(/^[\s\n]+|[\s\b]+$/g, '');
    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};