
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
        //% block="one"
        One,
        //% block="two"
        Two
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
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
    * TODO: describe your function here
    * @param value1 describe value here, eg: 5
    * @param value2 describe value here, eg: 5
    */
    //% block
    export function BitwiseAnd(value1: number, value2: number): number {
        return value1 & value2;
    }
}
