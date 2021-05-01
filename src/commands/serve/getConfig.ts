import { resolve } from 'path'
import { getAbsolutePath } from '../../files'
import { Config } from '../../runner'

export interface ServeArguments {
    directory: string
    port: number
    livereload: boolean
    livereloadPort: number
    listenerFiles: string[]
    watch: string[]
    root: string
    delay: number
}

const getConfig = (args: ServeArguments): Config => {
    const directory = String(args.directory)
    if (args.livereload) {
        if (0 === args.listenerFiles.length) {
            args.listenerFiles.push(`${args.directory}/index.html`)
        }
        if (0 === args.watch.length) {
            args.watch.push(args.directory)
        }
    }

    return {
        dir: getAbsolutePath(directory),
        port: args.port,
        livereload: args.livereload
            ? {
                port: args.livereloadPort,
                listen: args.watch.map(path => getAbsolutePath(path)),
                listenerFiles: args.listenerFiles.map(path => getAbsolutePath(path)),
                delayInMillisecs: args.delay,
                rootFile: getAbsolutePath('' === args.root ? resolve(directory, 'index.html') : args.root)
            }
            : null
    }
}

export default getConfig
