import { Argv } from 'yargs'

const setupArgs = (yargs: Argv): void => {
    yargs.positional('directory', {
        type: 'string'
    })
    yargs.option('port', {
        alias: 'p',
        type: 'number',
        default: 7100,
        description: 'Port where the server  is listening'
    })
    yargs.option('livereload', {
        alias: 'l',
        type: 'boolean',
        default: false,
        description: 'Reload page in the browser on file changes'
    })
    yargs.option('livereloadPort', {
        alias: 'o',
        type: 'number',
        default: 35729,
        description: 'Port where the livereload server is listening'
    })
    yargs.option('listenerFiles', {
        alias: 'f',
        type: 'string',
        array: true,
        default: [],
        defaultDescription: '<DIRECTORY>/index.html',
        description: 'List of HTML files to reload on file changes'
    })
    yargs.option('watch', {
        alias: 'w',
        type: 'string',
        array: true,
        default: [],
        defaultDescription: '<DIRECTORY>',
        description: 'Watch changes in files and directories'
    })
    yargs.option('root', {
        alias: 'r',
        type: 'string',
        default: '',
        defaultDescription: '<DIRECTORY>/index.html',
        description: 'Default file to serve on the `/` route'
    })
    yargs.option('delay', {
        alias: 'd',
        type: 'number',
        default: 100,
        description: 'Livereload delay on file file changes (millisecs)'
    })
    yargs.demandOption('directory')
}

export default setupArgs
