/*
 * @Author: stupid cat
 * @Date: 2017-05-07 18:57:36
 * @Last Modified by: stupid cat
 * @Last Modified time: 2017-05-16 19:40:38
 *
 * This project uses the AGPLv3 license. Please read the license file before using/adapting any of the code.
 */

var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.ARRAY;
};

e.requireCtx = require;

e.isTag = true;
e.name = `sort`;
e.args = `&lt;array&gt; [descending]`;
e.usage = `{sort;array[;descending]}`;
e.desc = `Sorts the provided array in ascending order. If descending is provided, sorts in descending order. If {get} or {aget} are used, will modify the original array.`;
e.exampleIn = `{sort;[3, 2, 5, 1, 4]}`;
e.exampleOut = `[1,2,3,4,5]`;

e.execute = async function (params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let words = params.words;
    var replaceString = '';
    var replaceContent = false;
    let args = params.args;
    if (params.args[1]) {
        let deserialized = await bu.getArray(params, args[1]);

        if (deserialized && Array.isArray(deserialized.v)) {
            let intArray = true;
            let parsed = deserialized.v.map(e => {
                if (/^-?\d+(\.\d*)?$/.test(e)) e = parseFloat(e);
                else intArray = false;
                return e;
            });
            if (intArray) {
                parsed.sort((a, b) => a - b);
                deserialized.v = parsed;
            } else deserialized.v.sort();
            if (args[2]) deserialized.v.reverse();
            if (deserialized.n) {
                await bu.setArray(deserialized, params);
            } else replaceString = bu.serializeTagArray(deserialized.v);
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