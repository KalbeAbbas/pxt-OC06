//% color=190 weight=100 icon="\uf1ec" block="Basic Blocks"
namespace OC06 {
    let OC06_ADDR = 0x38
    let PCA9554A_REG_OUTPUT = 0x01
    let REG_OUTPUT = 0x00
    let STEP_SIZE = 1
    let MODE0 = 0x04
    let MODE1 = 0x02
    let MODE2 = 0x01
    let nENABLE = 0x10
    let DIR = 0x20
    let DECAY = 0x40

    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(OC06_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(OC06_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(OC06_ADDR, NumberFormat.UInt8BE);
    }

    REG_OUTPUT &= ~MODE0; //Configure for full step
    REG_OUTPUT &= ~MODE1;
    REG_OUTPUT &= ~MODE2;

    REG_OUTPUT |= nENABLE; //Disable device by pulling enable high

    REG_OUTPUT &= ~DIR; //Sets direction as forward

    REG_OUTPUT &= ~DECAY; //Set to slow decay on PWM current

    setreg(PCA9554A_REG_OUTPUT, REG_OUTPUT)


}