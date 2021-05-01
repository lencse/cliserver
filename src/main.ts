import yargs from 'yargs'
import manual from './commands/manual'
import chalk from 'chalk'
import serve from './commands/serve'

export const main = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    yargs.scriptName('cliserver')
        .usage(manual())
        .command('serve [directory]', serve.description, serve.setupArgs, serve.handler)
        .alias('v', 'version')
        .alias('h', 'help')
        .help()
        .showHelpOnFail(true)
        .demandCommand(1, '')
        .strict()
        .argv
}

process.on('uncaughtException', (e: Error) => {
    console.error(`${chalk.red('ERROR:')} ${e.message}`)
    process.exit(2)
})

// process.on('exit', code => {
//     if (1 === code) {
//         process.exit(0)
//     }
// })
