import { existsSync } from 'fs'
import { resolve } from 'path'

const { version } = existsSync(resolve(__dirname, '../../package.json'))
    ? require('../../package')
    : require('../../../package')

const logo = "   ____ _     ___                              \r\n  / ___| |   |_ _|___  ___ _ ____   _____ _ __ \r\n | |   | |    | |/ __|/ _ \\ '__\\ \\ / / _ \\ '__|\r\n | |___| |___ | |\\__ \\  __/ |   \\   /  __/ |   \r\n  \\____|_____|___|___/\\___|_|    \\_/ \\___|_|"

export const title = `${logo} v${version}
`
