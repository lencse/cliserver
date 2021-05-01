import {
    getAbsolutePath,
    getRelativePath
} from '../src/files'
import { homedir } from 'os'

describe('Get absolute path', () => {

    it('By absolute path', () => {
        const result = getAbsolutePath('/tmp/path/to/file.txt')
        expect(result).toBe('/tmp/path/to/file.txt')
    })

    it('Normalize absolute path', () => {
        const result = getAbsolutePath('/tmp/something/deep/../../path/to/file.txt')
        expect(result).toBe('/tmp/path/to/file.txt')
    })

    it('By relative path', () => {
        const result = getAbsolutePath('path/to/file.txt')
        expect(result).toBe(process.cwd() + '/path/to/file.txt')
    })

    it('Normalize relative path', () => {
        const result = getAbsolutePath('path/to/../to/file.txt')
        expect(result).toBe(process.cwd() + '/path/to/file.txt')
    })

    it('Resolve home directory', () => {
        const result = getAbsolutePath('~/path/to/file.txt')
        expect(result).toBe(homedir() + '/path/to/file.txt')
    })

})

describe('Get relative path', () => {

    it('Absolute path', () => {
        const result = getRelativePath('/tmp/path/to/file.txt', '/tmp/path')
        expect(result).toBe('to/file.txt')
    })

    it('Relative path', () => {
        const result = getRelativePath('path/to/file.txt', 'path')
        expect(result).toBe('to/file.txt')
    })

})
