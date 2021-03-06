/*
 * @Author: stupid cat
 * @Date: 2017-05-21 00:22:32
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-07-13 10:39:59
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = `rolemention`;
e.args = `<name> [quiet]`;
e.usage = `{rolemention;name[;quiet]}`;
e.desc = `Returns a role's mention. If
<code>quiet</code> is specified, if a role can't be found it will simply return the <code>name</code>`;
e.exampleIn = `The admin role mention is: {rolemention;admin}`;
e.exampleOut = `The admin role mention is: @admin`;

e.execute = async function (params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let args = params.args,
        msg = params.msg;
    var replaceString = '';
    var replaceContent = false;

    var obtainedRole = await bu.getTagRole(msg, args);

    if (obtainedRole)
        replaceString = obtainedRole.mention;

    else if (!args[2])
        return '';
    else
        replaceString = args[1];

    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};