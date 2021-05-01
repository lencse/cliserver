import { readFileSync } from 'fs'
import { insertLivereloadScriptTagIntoHtml } from '../html'
import { getRelativePath } from '../files'

export interface LivereloadConfig {
    port: number
    listenerFiles: string[]
    listen: string[]
    rootFile: string
    delayInMillisecs: number
}

export interface Config {
    dir: string
    port: number
    livereload: LivereloadConfig | null
}

export const runner = (
    serveFile: (route: string, callback: () => string) => void,
    attachServer: () => void,
    livereloadServer: (port: number, delayInMillisecs: number, listen: string[]) => void,
    staticServer: (port: number, dir: string) => void
) => (config: Config): void => {
    if (config.livereload) {
        const srv = (route: string, filePath: string): void => {
            serveFile(route, () => insertLivereloadScriptTagIntoHtml(
                readFileSync(filePath).toString(),
                (config.livereload?.port || 0)
            ))
        }
        config.livereload.listenerFiles.forEach(path => {
            srv(`/${getRelativePath(path, config.dir)}`, path)
        })
        srv('/', config.livereload.rootFile)
        livereloadServer(
            config.livereload.port,
            config.livereload.delayInMillisecs,
            config.livereload.listen
        )
        attachServer()
    }
    staticServer(config.port, config.dir)
}
