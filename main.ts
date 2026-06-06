radio.onReceivedValue(function (info, wert) {
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    if (info == "kurve") {
        kurve_get = wert
        kurve_rad = Math.round(Math.map(kurve_get, -45, 45, -255, 255))
    } else if (info == "gerade") {
        gerade_get = wert
        gerade_rad = Math.round(Math.map(gerade_get, -45, 45, -255, 255))
    } else if (info == "kupplung") {
        if (wert == 0) {
            robotbit.Servo(robotbit.Servos.S1, 0)
        } else {
            robotbit.Servo(robotbit.Servos.S1, hebe_winkel)
        }
    }
})
let rechts_soll = 0
let links_soll = 0
let kurve_rechts = 0
let kurve_links = 0
let gerade_rechts = 0
let gerade_links = 0
let gerade_rad = 0
let gerade_get = 0
let kurve_rad = 0
let kurve_get = 0
let hebe_winkel = 0
hebe_winkel = 70
let lauf_flag = 0
let links_rad = 0
let rechts_rad = 0
let links_ist = 0
let rechts_ist = 0
radio.setGroup(26)
basic.showIcon(IconNames.Diamond)
let motor_links = robotbit.Motors.M1A
let motor_rechts = robotbit.Motors.M2A
robotbit.MotorStopAll()
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
robotbit.Servo(robotbit.Servos.S1, 0)
basic.forever(function () {
    gerade_links = gerade_rad * 1.2
    gerade_rechts = gerade_rad
    kurve_links = kurve_rad * -1
    kurve_rechts = kurve_rad
    // if (links_soll > 255) {
    // links_soll = 255
    // } else if (links_soll < -255) {
    // links_soll = -255
    // }
    links_soll = Math.min(Math.max(gerade_links + kurve_links, -255), 255)
    rechts_soll = Math.min(Math.max(gerade_rechts + kurve_rechts, -255), 255)
    // if (rechts_soll > 255) {
    // rechts_soll = 255
    // } else if (rechts_soll < -255) {
    // rechts_soll = -255
    // }
    if (links_ist < links_soll) {
        links_ist = Math.min(links_ist + 12, links_soll)
    } else if (links_ist > links_soll) {
        links_ist = Math.max(links_ist - 12, links_soll)
    }
    if (rechts_ist < rechts_soll) {
        rechts_ist = Math.min(rechts_ist + 12, rechts_soll)
    } else if (rechts_ist > rechts_soll) {
        rechts_ist = Math.max(rechts_ist - 12, rechts_soll)
    }
    if (links_soll == 0 && rechts_soll == 0 && links_ist == 0 && rechts_ist == 0) {
        robotbit.MotorStopAll()
    } else {
        robotbit.MotorRun(motor_links, links_ist)
robotbit.MotorRun(motor_rechts, rechts_ist)
    }
    // serial.writeLine("links: " + motor_links + " rechts_ist: " + rechts_ist)
    basic.pause(10)
})
control.inBackground(function () {
    while (true) {
        strip.rotate(1)
        strip.show()
        basic.pause(1500)
    }
})
