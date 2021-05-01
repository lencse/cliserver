import setupArgs from './setupArgs'
import handler from './handler'
import chalk from 'chalk'

const description = `Serve from directory
${chalk.cyan('https://github.com/lencse/cliserver#serve')}`

export default {
    setupArgs,
    handler,
    description
}
