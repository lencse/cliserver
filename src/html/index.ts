export const indexOfClosingBodyTag = (html: string): number => {
    const body = new RegExp(/<\/body>/gi)
    let result = -1

    while (true) {
        const regex = body.exec(html)
        if (!regex) {
            break
        }
        result = regex.index
    }

    if (-1 === result) {
        throw new Error('Closing body tag not found')
    }

    return result
}

export const insertIntoString = (
    str: string,
    insertion: string,
    position: number
): string => (
    str.substr(0, position) +
    insertion +
    str.substr(position)
)

export const livereloadScriptTag = (livereloadPort: number): string => `<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':${livereloadPort}/livereload.js"></' + 'script>')</script>`

export const insertLivereloadScriptTagIntoHtml = (
    html: string,
    livereloadPort: number
): string => insertIntoString(
    html,
    livereloadScriptTag(livereloadPort),
    indexOfClosingBodyTag(html)
)
