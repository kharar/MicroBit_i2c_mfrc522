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
function I2C_ReadRegister (addr: number, reg: number) {
    pins.i2cWriteNumber(
    addr,
    reg,
    NumberFormat.UInt8LE,
    true
    )
    return pins.i2cReadNumber(addr, NumberFormat.UInt8LE, false)
}
serial.redirectToUSB()
basic.forever(function () {
    serial.writeLine("PCD_WriteRegister(TxModeReg, 0x00);")
    serial.writeLine("PCD_WriteRegister(RxModeReg, 0x00);")
    serial.writeLine("PCD_WriteRegister(ModWidthReg, 0x26);")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
})
