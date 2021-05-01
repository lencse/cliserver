import { Arguments } from 'yargs'
import { ServeArguments } from './getConfig'

const parseArguments = (argv: Arguments<ServeArguments>): ServeArguments => {
    return {
        directory: String(argv.directory),
        port: Number(argv.port),
        livereload: Boolean(argv.livereload),
        livereloadPort: Number(argv.livereloadPort),
        listenerFiles: argv.listenerFiles.map(s => String(s)),
        watch: argv.watch.map(s => String(s)),
        root: String(argv.root),
        delay: Number(argv.delay)
    }
}

export default parseArguments
