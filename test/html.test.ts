import {
    indexOfClosingBodyTag,
    insertIntoString,
    livereloadScriptTag,
    insertLivereloadScriptTagIntoHtml
} from '../src/html'

describe('Index of closing body tag', () => {

    it('Index', () => {
        const html = '<html><head></head><body>Content</body></html>'
        const result = indexOfClosingBodyTag(html)
        expect(result).toBe(32)
    })

    it('Error when closing tag is missing', () => {
        const html = '<html><head></head><body>Content</html>'
        try {
            indexOfClosingBodyTag(html)
            fail('Exception not thrown')
        } catch (e) {
            expect(e).toBeDefined()
        }
    })

    it('Find the closing body tag', () => {
        const html = '<html><head><!--<body></body>--></head><body>Content</body></html>'
        const result = indexOfClosingBodyTag(html)
        expect(result).toBe(52)
    })

    it('Find uppercase closing tag', () => {
        const html = '<html><head></head><body>Content</BODY></html>'
        const result = indexOfClosingBodyTag(html)
        expect(result).toBe(32)
    })

})

describe('Insert into string', () => {

    it('Insertion', () => {
        const result = insertIntoString('Paris is burning', 'not ', 9)
        expect(result).toEqual('Paris is not burning')
    })

})

describe('Livereload script tag', () => {

    it('Script tag', () => {
        const result = livereloadScriptTag(1000)
        expect(result).toEqual("<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':1000/livereload.js\"></' + 'script>')</script>")
    })

})

describe('Insert livereload script tag into HTML', () => {

    it('Insertion', () => {
        const result = insertLivereloadScriptTagIntoHtml(
            '<html><head></head><body>Content</body></html>',
            1000
        )
        expect(result).toEqual("<html><head></head><body>Content<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':1000/livereload.js\"></' + 'script>')</script></body></html>")
    })

})
