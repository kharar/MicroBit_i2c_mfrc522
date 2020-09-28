function I2C_WriteRegister (addr: number, reg: number, val: number) {
    pins.i2cWriteNumber(
    addr,
    reg,
    NumberFormat.UInt8LE,
    true
    )
    pins.i2cWriteNumber(
    addr,
    val,
    NumberFormat.UInt8LE,
    false
    )
}
function I2C_CrearRegisterBitMask (reg: number, mask: number) {
    tmp = I2C_ReadRegister(MFRC522_I2C_Address, reg)
}
function I2C_ReadRegister (addr: number, reg: number) {
    pins.i2cWriteNumber(
    addr,
    reg,
    NumberFormat.UInt8LE,
    true
    )
    return pins.i2cReadNumber(addr, NumberFormat.UInt8LE, false)
}
let tmp = 0
let MFRC522_I2C_Address = 0
serial.redirectToUSB()
MFRC522_I2C_Address = 40
basic.forever(function () {
    serial.writeLine("PCD_WriteRegister(TxModeReg, 0x00);")
    I2C_WriteRegister(MFRC522_I2C_Address, 18, 0)
    serial.writeLine("PCD_WriteRegister(RxModeReg, 0x00);")
    I2C_WriteRegister(MFRC522_I2C_Address, 19, 0)
    serial.writeLine("PCD_WriteRegister(ModWidthReg, 0x26);")
    I2C_WriteRegister(MFRC522_I2C_Address, 36, 38)
    serial.writeLine("PCD_ClearRegisterBitMask(CollReg, 0x80);")
    I2C_WriteRegister(MFRC522_I2C_Address, 36, 38)
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
})
