
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum digit_value {
        //% block="zero"
        zero,
        //% block="one"
        one,
        //% block="two"
        two,
        //% block="complement"
        com
}

/**
* Custom blocks
*/
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
    * TODO: describe your function here
    * @param n describe parameter here, eg: 5
    * @param s describe parameter here, eg: "Hello"
    * @param e describe parameter here
    */
    // block
    export function foo(n: number, s: string, e: digit_value): void {
        // Add code here
    }

    /**
    * TODO: describe your function here
    * @param value1 describe value here, eg: 4
    * @param value2 describe value here, eg: 5
    */
    //% block
    export function BitwiseAnd(value1: number, value2: number): number {
        return value1 & value2;
    }

    /**
    * TODO: describe your function here
    * @param value1 describe value here, eg: 3
    * @param value2 describe value here, eg: 5
    */
    //% block
    export function BitwiseOr(value1: number, value2: number): number {
        return value1 | value2;
    }

    //% blockId="id_pow" block="%op1 | raised to %op2"
    export function fn_raiseto(base: number, exp: number): number {
        return Math.pow(base, exp)
    }
    //% blockId="id_getbit" block="get bit %op1 | in %op2"
    export function fn_getbit(pos: number, num: number): number {
        return (num >> pos) & 1
    }
    //% blockId="id_setbit" block="set bit %op1 | in %op2 | to %d"
    export function fn_setbit(pos: number, num: number, dv: digit_value): number {
        if (dv == digit_value.zero)
            return num & ((1 << pos) ^ 0xffff)
        else if (dv == digit_value.one)
            return num | (1 << pos)
        else
            return num ^ (1 << pos)
    }

    let hex_arr = "0123456789abcdef"
    let dec_num = 0

    //% blockId="id_hextodec" block="hex %hex_num | to dec"
    export function fn_HextoDec(hex_num: string): number {
        dec_num = 0
        for (let index = 0; index <= hex_num.length - 1; index++) {
            let char = hex_num.charAt(hex_num.length - 1 - index)
            for (let index2 = 0; index2 <= 15; index2++) {
                if (char.compare(hex_arr.charAt(index2)) == 0) {
                    dec_num = dec_num + index2 * Math.pow(16, index)
                }
            }
        }
        return dec_num
    }
}
