import { Config } from '../../runner'
import chalk from 'chalk'
import { EOL } from 'os'
import Table from 'cli-table'

const info = (config: Config): void => {
    const table = new Table({ colors: false })
    table.push({
        'Serving from': chalk.yellow(config.dir)
    })
    console.info(table.toString())
    if (config.livereload) {
        const livereloadTable = new Table()
        livereloadTable.push({
            Watching: config.livereload.listen.map(l => chalk.yellow(l)).join(EOL)
        })
        livereloadTable.push({
            Port: chalk.yellow(config.livereload.port)
        })
        livereloadTable.push({
            Listeners: config.livereload.listenerFiles.map(l => chalk.yellow(l)).join(EOL)
        })
        livereloadTable.push({
            Delay: chalk.yellow(`${config.livereload.delayInMillisecs} ms`)
        })
        livereloadTable.push({
            'Root file': chalk.yellow(config.livereload.rootFile)
        })
        console.info(`${EOL}Livereload config`)
        console.info(livereloadTable.toString())
    }
    console.info(`Serving…
Open ${chalk.cyan(`http://localhost:${config.port}`)}`)
}

export default info
