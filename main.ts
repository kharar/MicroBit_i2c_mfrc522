function i2c_HEX_WriteRegister (register: string, data: string) {
    pins.i2cWriteNumber(
    MFRC522_I2C_Address,
    custom.fn_HextoDec("" + register + data),
    NumberFormat.UInt16BE,
    false
    )
}
function about () {
    serial.writeLine("References:")
    serial.writeLine("www.nxp.com/docs/en/data-sheet/MFRC522.pdf")
    serial.writeLine("github.com/semaf/MFRC522_I2C_Library")
}
function I2C_HEX_ReadRegisterMulti (register: string, numberOfBytes: number) {
    list = []
    pins.i2cWriteNumber(
    MFRC522_I2C_Address,
    custom.fn_HextoDec(register),
    NumberFormat.UInt8LE,
    true
    )
    for (let index = 0; index <= numberOfBytes - 1; index++) {
        list.push(pins.i2cReadNumber(MFRC522_I2C_Address, NumberFormat.UInt8BE, index <= numberOfBytes - 1))
    }
    return list
}
function I2C_HEX_ClearRegisterBitMask (register: string, mask: string) {
    tmp = I2C_HEX_ReadRegister(register)
    temp = custom.BitwiseOr(tmp, custom.fn_HextoDec(mask))
    serial.writeLine("I2C_HEX_ClearRegisterBitMask: Routine needs some finishing")
    i2c_HEX_WriteRegister(register, "26")
}
function I2C_HEX_ReadRegister (register: string) {
    pins.i2cWriteNumber(
    MFRC522_I2C_Address,
    custom.fn_HextoDec(register),
    NumberFormat.UInt8LE,
    true
    )
    return pins.i2cReadNumber(MFRC522_I2C_Address, NumberFormat.UInt8BE, false)
}
let temp = 0
let tmp = 0
let list: number[] = []
let MFRC522_I2C_Address = 0
serial.redirectToUSB()
basic.pause(100)
MFRC522_I2C_Address = custom.fn_HextoDec("28")
i2c_HEX_WriteRegister("2A", "80")
i2c_HEX_WriteRegister("2B", "A9")
i2c_HEX_WriteRegister("2C", "03")
i2c_HEX_WriteRegister("2D", "E8")
i2c_HEX_WriteRegister("15", "40")
i2c_HEX_WriteRegister("11", "3D")
let expectedValue = custom.fn_HextoDec("80")
let obtainedValue = I2C_HEX_ReadRegister("14")
i2c_HEX_WriteRegister("14", "83")
expectedValue = custom.fn_HextoDec("92")
obtainedValue = I2C_HEX_ReadRegister("37")
serial.writeLine("Setup done")
serial.writeLine("")
basic.pause(100)
basic.forever(function () {
    expectedValue = custom.fn_HextoDec("A0")
    obtainedValue = I2C_HEX_ReadRegister("0E")
    i2c_HEX_WriteRegister("0E", "20")
    i2c_HEX_WriteRegister("01", "00")
    i2c_HEX_WriteRegister("04", "7F")
    expectedValue = custom.fn_HextoDec("00")
    obtainedValue = I2C_HEX_ReadRegister("0A")
    i2c_HEX_WriteRegister("0A", "80")
    i2c_HEX_WriteRegister("09", "26")
    i2c_HEX_WriteRegister("0D", "07")
    i2c_HEX_WriteRegister("01", "0C")
    expectedValue = custom.fn_HextoDec("07")
    obtainedValue = I2C_HEX_ReadRegister("0D")
    i2c_HEX_WriteRegister("0D", "87")
    obtainedValue = custom.fn_HextoDec("44")
    while (obtainedValue == custom.fn_HextoDec("04")) {
        obtainedValue = I2C_HEX_ReadRegister("04")
        serial.writeValue("04", obtainedValue)
    }
    basic.pause(100)
})
