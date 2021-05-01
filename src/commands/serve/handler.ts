import Koa from 'koa'
import server from 'koa-static'
import logger from 'koa-logger'
import { createServer } from 'livereload'
import Router from 'koa-router'
import { runner } from '../../runner'
import http from 'http'
import chalk from 'chalk'
import yargs from 'yargs'
import { title } from '../../app'
import getConfig, { ServeArguments } from './getConfig'
import info from './info'
import parseArguments from './parseArguments'

const handler = (argv: yargs.Arguments<ServeArguments>): void => {
    const args = parseArguments(argv)
    const config = getConfig(args)

    const koa = new Koa()
    koa.use(logger())
    const router = new Router()

    const serveFile = (route: string, fileContent: () => string) => {
        router.get(route, async (ctx: Koa.Context) => {
            ctx.body = fileContent()
            ctx.status = 200
            ctx.set('Content-Type', 'text/html')
        })
    }

    const attachServer = () => {
        koa.use(router.routes()).use(router.allowedMethods())
    }

    const livereloadServer = (port: number, delayInMillisecs: number, listen: string[]) => {
        const srv = createServer({
            port,
            delay: delayInMillisecs
        })
        srv.on('error', (e: {code: string}) => {
            if ('EADDRINUSE' === e.code) {
                throw new Error(`Livereload port in use: ${port}`)
            }
        })

        srv.watch(listen)
    }

    const staticServer = (port: number, dir: string) => {
        koa.use(server(dir))
        const srv = http.createServer(koa.callback())
        srv.on('error', (e: {code: string}) => {
            if ('EADDRINUSE' === e.code) {
                throw new Error(`Port in use: ${port}`)
            }
        })
        srv.listen(port)
    }

    console.info(`
${chalk.green(title)}
`)

    runner(serveFile, attachServer, livereloadServer, staticServer)(config)
    info(config)
}

export default handler
