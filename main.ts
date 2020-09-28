function SetRegisterBitMask (register: number, mask: number) {
    tmp = I2C_ReadRegister(MFRC522_I2C_Address, 1)
    I2C_WriteRegister(MFRC522_I2C_Address, 1, custom.BitwiseAnd(tmp, mask))
}
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
function I2C_ClearRegisterBitMask (reg: number, mask: number) {
    tmp = I2C_ReadRegister(MFRC522_I2C_Address, reg)
    I2C_WriteRegister(MFRC522_I2C_Address, reg, custom.BitwiseAnd(tmp, mask))
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
    I2C_ClearRegisterBitMask(MFRC522_I2C_Address, 128)
    serial.writeLine("status = PCD_TransceiveData(&command, 1, bufferATQA, bufferSize, &validBits);")
    serial.writeLine("PCD_WriteRegister(CommandReg, PCD_Idle);")
    I2C_WriteRegister(MFRC522_I2C_Address, 1, 0)
    serial.writeLine("PCD_WriteRegister(ComIrqReg, 0x7F);")
    I2C_WriteRegister(MFRC522_I2C_Address, 4, 127)
    serial.writeLine("PCD_WriteRegister(FIFOLevelReg, 0x80);")
    I2C_WriteRegister(MFRC522_I2C_Address, 10, 128)
    serial.writeLine("PCD_WriteRegister(FIFODataReg, sendLen, sendData);")
    I2C_WriteRegister(MFRC522_I2C_Address, 9, 38)
    serial.writeLine("PCD_WriteRegister(BitFramingReg, bitFraming);")
    I2C_WriteRegister(MFRC522_I2C_Address, 13, 7)
    serial.writeLine("PCD_WriteRegister(CommandReg, command);")
    I2C_WriteRegister(MFRC522_I2C_Address, 1, 12)
    serial.writeLine("PCD_SetRegisterBitMask(BitFramingReg, 0x80);")
    serial.writeLine("")
    serial.writeLine("")
    serial.writeLine("")
})
