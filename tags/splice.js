/*
 * @Author: stupid cat
 * @Date: 2017-05-07 18:57:59
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-05-07 18:58:28
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.ARRAY;
};

e.requireCtx = require;

e.isTag = true;
e.name = `splice`;
e.args = `&lt;array&gt; &lt;start&gt; [deleteCount] [items]...`;
e.usage = `{splice;array;start[;deleteCount[;items]...]}`;
e.desc = `Removes deleteCount elements (defaults to all) starting at index start from the specified array. Then, adds each subsequent item at that position in the array. Returns the removed items.`;
e.exampleIn = `{set;array;["this", "is", "an", "array"]} {splice;{get;array};1;1;was} {get;array}`;
e.exampleOut = `["is"] ["this","was","an","array"]`;

e.execute = async function (params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let replaceContent = false;
    let replaceString;
    if (params.args.length >= 3) {
        params.args[1] = await bu.processTagInner(params, 1);
        let args = params.args;
        let deserialized = await bu.getArray(params, args[1]);
        if (deserialized && Array.isArray(deserialized.v)) {
            let start = parseInt(args[2]);
            let end;
            if (args[3]) end = parseInt(args[3]);

            if (isNaN(start) || (end && isNaN(end))) {
                replaceString = await bu.tagProcessError(params, '`Invalid start or end`');
            } else {
                let argss = [start, end];
                if (args[4]) argss = argss.concat(args.slice(4));
                let newArray = [].splice.apply(deserialized.v, argss);
                replaceString = bu.serializeTagArray(newArray);
                await bu.setArray(deserialized, params);
            }
        } else {
            replaceString = await bu.tagProcessError(params, '`Not an array`');
        }
    } else {
        replaceString = await bu.tagProcessError(params, '`Not enough arguments`');
    }

    return {
        terminate: params.terminate,
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};