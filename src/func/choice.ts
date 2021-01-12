/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import type {
    Arr,
    Fun,
    SafeKey,
} from "../type/defs";




/**
 * Functional replacement of a `switch` statement. When used properly (i.e.
 * `choices` object is prepared once and stored in memory for later accesses)
 * then for large choice sets it should be noticeably faster than plain
 * `switch` statement - it's semantics require sequential evaluation, so
 * it's time complexity, in general case, tends to be linear. Here, there is
 * no requirement of sequential evaluation, so average time complexity should
 * be no worse than logarithmic.
 *
 * @function choose
 * @param key
 * @param [choices] Plain JS object in form `\{ key: (...In) => Out \}`
 * @param [defaultChoice] Simple JS function in form `(...In) => Out`
 * @param [args] If choice functions accepts arguments, then put an array of
 *     appropriate values here.
 * @returns {Out | undefined} Return value of choosen or default function.
 */
export function choose<
    In extends Arr | [],
    Out,
    Key extends SafeKey,
> (
    key: Key,
    choices = {} as Record<Key, Fun<In, Out>>,
    defaultChoice: Fun<In> = () => undefined,
    args?: In,
):
    | Out
    | ReturnType<typeof defaultChoice>
{
    return (
        key in choices ?
            choices[key](...(args || [] as In)) :
            defaultChoice(...(args || [] as In))
    );
}
