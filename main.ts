function i2c_HEX_WriteRegister (register: string, data: string) {
    pins.i2cWriteNumber(
    MFRC522_I2C_Address,
    custom.fn_HextoDec("" + register + data),
    NumberFormat.UInt16BE,
    false
    )
}
function SetRegisterBitMask (address: number, register: number, mask: number) {
    tmp = I2C_ReadRegister(address, register)
    I2C_WriteRegister(address, register, custom.BitwiseAnd(tmp, mask))
}
function I2C_WriteRegister (address: number, register: number, value: number) {
    pins.i2cWriteNumber(
    address,
    register,
    NumberFormat.UInt8LE,
    true
    )
    pins.i2cWriteNumber(
    address,
    value,
    NumberFormat.Int16BE,
    false
    )
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
function I2C_ClearRegisterBitMask (address: number, register: number, mask: number) {
    tmp = I2C_ReadRegister(address, register)
    I2C_WriteRegister(address, register, custom.BitwiseOr(tmp, mask))
}
function CommunicateWithPICC () {
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
    SetRegisterBitMask(MFRC522_I2C_Address, 13, 128)
    for (let index = 0; index <= 2000; index++) {
        i = 2000 - index
        n = I2C_ReadRegister(MFRC522_I2C_Address, 4)
        if (custom.BitwiseAnd(n, 48) != 0) {
            serial.writeLine("ComIrqReg Success!")
            break;
        }
        if (custom.BitwiseAnd(n, 1) != 0) {
            serial.writeLine("ComIrqReg: Timeout!")
            return 4
        }
    }
    if (i == 0) {
        serial.writeLine("ComIrqReg: Timeout!")
        return 4
    }
    errorRegValue = I2C_ReadRegister(MFRC522_I2C_Address, 6)
    if (custom.BitwiseAnd(errorRegValue, 19) != 0) {
        serial.writeLine("ErrorReg: BufferOvfl / ParityErr / ProtocolErr")
        return 4
    }
    serial.writeLine("Retrieve data...")
    serial.writeLine("byte n = PCD_ReadRegister(FIFOLevelReg);")
    n = I2C_ReadRegister(MFRC522_I2C_Address, 10)
    serial.writeValue("n", n)
    serial.writeLine("PCD_ReadRegister(FIFODataReg, n, backData, rxAlign);")
    values = [n]
    for (let index = 0; index <= n - 1; index++) {
        values[index] = I2C_ReadRegister(MFRC522_I2C_Address, 9)
    }
    serial.writeLine("_validBits = PCD_ReadRegister(ControlReg) & 0x07;")
    validBits = custom.BitwiseAnd(I2C_ReadRegister(MFRC522_I2C_Address, 12), 7)
    serial.writeValue("validBits", validBits)
    if (custom.BitwiseAnd(errorRegValue, 8) != 0) {
        serial.writeLine("if (errorRegValue & 0x08)")
        serial.writeLine("ErrorReg: CollErr")
        return 4
    }
    serial.writeLine("CommunicateWithPICC: OK")
    return 0
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
function I2C_ReadRegister (address: number, register: number) {
    pins.i2cWriteNumber(
    address,
    register,
    NumberFormat.UInt8LE,
    true
    )
    return pins.i2cReadNumber(address, NumberFormat.UInt8BE, false)
}
let temp = 0
let validBits = 0
let values: number[] = []
let errorRegValue = 0
let n = 0
let i = 0
let list: number[] = []
let tmp = 0
let MFRC522_I2C_Address = 0
serial.redirectToUSB()
serial.writeLine("Reference: github.com/semaf/MFRC522_I2C_Library")
serial.writeLine("Reference: www.nxp.com/docs/en/data-sheet/MFRC522.pdf")
MFRC522_I2C_Address = 40
basic.forever(function () {
    basic.pause(10)
    serial.writeLine("PCD_WriteRegister(TxModeReg, 0x00);")
    i2c_HEX_WriteRegister("12", "00")
    serial.writeLine("PCD_WriteRegister(RxModeReg, 0x00);")
    i2c_HEX_WriteRegister("13", "00")
    serial.writeLine("PCD_WriteRegister(ModWidthReg, 0x26);")
    i2c_HEX_WriteRegister("24", "26")
    serial.writeLine("PCD_ClearRegisterBitMask(CollReg, 0x80);")
})
