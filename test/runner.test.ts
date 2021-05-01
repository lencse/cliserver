import { runner } from '../src/runner'
import { resolve } from 'path'

describe('Test runner', () => {

    it('Without livereload', () => {
        const observer = {
            serving: [],
            attached: false,
            livereload: {
                port: 0,
                delayInMillisecs: 0,
                listen: []
            },
            staticServer: {
                port: 0,
                dir: ''
            }
        }
        const serveFile = (route: string, callback: () => string) => {
            observer.serving.push({ route, callback })
        }

        const attachServer = () => {
            observer.attached = true
        }

        const livereloadServer = (port: number, delayInMillisecs: number, listen: string[]) => {
            observer.livereload = {
                port,
                delayInMillisecs,
                listen
            }
        }

        const staticServer = (port: number, dir: string) => {
            observer.staticServer = {
                port,
                dir
            }
        }

        runner(serveFile, attachServer, livereloadServer, staticServer)({
            dir: 'test/dir',
            port: 6000,
            livereload: null
        })

        expect(observer).toEqual(
            {
                attached: false,
                livereload: {
                    delayInMillisecs: 0,
                    listen: [],
                    port: 0
                },
                serving: [],
                staticServer: {
                    dir: 'test/dir',
                    port: 6000
                }
            }
        )
    })

    it('With livereload', () => {
        const observer = {
            serving: [],
            attached: false,
            livereload: {
                port: 0,
                delayInMillisecs: 0,
                listen: []
            },
            staticServer: {
                port: 0,
                dir: ''
            }
        }
        const serveFile = (route: string, callback: () => string) => {
            observer.serving.push({ route, callback })
        }

        const attachServer = () => {
            observer.attached = true
        }

        const livereloadServer = (port: number, delayInMillisecs: number, listen: string[]) => {
            observer.livereload = {
                port,
                delayInMillisecs,
                listen
            }
        }

        const staticServer = (port: number, dir: string) => {
            observer.staticServer = {
                port,
                dir
            }
        }

        runner(serveFile, attachServer, livereloadServer, staticServer)({
            dir: resolve(process.cwd(), 'test/fixtures'),
            port: 6000,
            livereload: {
                port: 10000,
                listen: [resolve(process.cwd(), 'test/fixtures')],
                listenerFiles: [resolve(process.cwd(), 'test/fixtures/index.html')],
                delayInMillisecs: 500,
                rootFile: resolve(process.cwd(), 'test/fixtures/index.html')
            }
        })

        observer.serving = observer.serving.map(srv => ({
            ...srv,
            callback: null,
            callbackResult: srv.callback()
        }))

        expect(observer).toEqual(
            {
                serving: [
                    {
                        route: '/index.html',
                        callback: null,
                        callbackResult: '<html>\n' +
                            '    <head></head>\n' +
                            '    <body><script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':10000/livereload.js"></\' + \'script>\')</script></body>\n' +
                            '</html>\n'
                    },
                    {
                        route: '/',
                        callback: null,
                        callbackResult: '<html>\n' +
                            '    <head></head>\n' +
                            '    <body><script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':10000/livereload.js"></\' + \'script>\')</script></body>\n' +
                            '</html>\n'
                    }
                ],
                attached: true,
                livereload: {
                    port: 10000,
                    delayInMillisecs: 500,
                    listen: [resolve(process.cwd(), 'test/fixtures')]
                },
                staticServer: { port: 6000, dir: resolve(process.cwd(), 'test/fixtures') }
            }
        )
    })

})
