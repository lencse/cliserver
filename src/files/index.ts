import { resolve, relative } from 'path'
import expandTilde from 'expand-tilde'

export const getAbsolutePath = (path: string): string =>
    resolve(expandTilde(path))

export const getRelativePath = (path: string, absolutePath: string): string =>
    relative(getAbsolutePath(absolutePath), getAbsolutePath(path))
