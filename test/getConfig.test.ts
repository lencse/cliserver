import getConfig from '../src/commands/serve/getConfig'
import { resolve } from 'path'

describe('Get config', () => {

    it('Default config', () => {
        const result = getConfig({
            directory: '.',
            port: 7100,
            livereload: false,
            livereloadPort: 35729,
            listenerFiles: [],
            watch: [],
            root: '',
            delay: 250
        })

        expect(result).toEqual({
            dir: process.cwd(),
            port: 7100,
            livereload: null
        })
    })

    it('Config without livereload', () => {
        const result = getConfig({
            directory: '/tmp/dir',
            port: 7200,
            livereload: false,
            livereloadPort: 35729,
            listenerFiles: [],
            watch: [],
            root: '',
            delay: 250
        })

        expect(result).toEqual({
            dir: '/tmp/dir',
            port: 7200,
            livereload: null
        })
    })

    it('Relative dir', () => {
        const result = getConfig({
            directory: '../',
            port: 7100,
            livereload: false,
            livereloadPort: 35729,
            listenerFiles: [],
            watch: [],
            root: '',
            delay: 250
        })

        expect(result).toEqual({
            dir: resolve(process.cwd(), '..'),
            port: 7100,
            livereload: null
        })
    })

    it('With livereload', () => {
        const result = getConfig({
            directory: '.',
            port: 7100,
            livereload: true,
            livereloadPort: 35729,
            listenerFiles: [],
            watch: [],
            root: '',
            delay: 250
        })

        expect(result).toEqual({
            dir: process.cwd(),
            port: 7100,
            livereload: {
                port: 35729,
                listen: [
                    process.cwd()
                ],
                listenerFiles: [
                    resolve(process.cwd(), 'index.html')
                ],
                delayInMillisecs: 250,
                rootFile: resolve(process.cwd(), 'index.html')
            }
        })
    })

    it('Livereload with complex config', () => {
        const result = getConfig({
            directory: './tmp',
            port: 7200,
            livereload: true,
            livereloadPort: 35000,
            listenerFiles: [
                'tmp/default.html',
                'tmp/page.html',
                'tmp/about.html'
            ],
            watch: [
                'tmp/default.html',
                'tmp/page.html',
                'tmp/about.html',
                './tmp/css',
                './tmp/js/app.js'
            ],
            root: './tmp/default.html',
            delay: 400
        })

        expect(result).toEqual({
            dir: resolve(process.cwd(), 'tmp'),
            port: 7200,
            livereload: {
                port: 35000,
                listen: [
                    resolve(process.cwd(), 'tmp/default.html'),
                    resolve(process.cwd(), 'tmp/page.html'),
                    resolve(process.cwd(), 'tmp/about.html'),
                    resolve(process.cwd(), 'tmp/css'),
                    resolve(process.cwd(), 'tmp/js/app.js')
                ],
                listenerFiles: [
                    resolve(process.cwd(), 'tmp/default.html'),
                    resolve(process.cwd(), 'tmp/page.html'),
                    resolve(process.cwd(), 'tmp/about.html')
                ],
                delayInMillisecs: 400,
                rootFile: resolve(process.cwd(), 'tmp/default.html')
            }
        })
    })

})
