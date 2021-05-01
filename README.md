# CLIserver

[![Node.js CI](https://github.com/lencse/cliserver/actions/workflows/default.yml/badge.svg)](https://github.com/lencse/cliserver/actions)
[![Coverage Status](https://coveralls.io/repos/github/lencse/cliserver/badge.svg?branch=main)](https://coveralls.io/github/lencse/cliserver?branch=main)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lencse_cliserver&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=lencse_cliserver)

CLIserver is a command line tool to run a local web server from a static directory and see the file changes without manually reloading the browser. Enjoy the [livereload ](http://livereload.com/) functionality without robust frameworks like AngularJS, Webpack or ReactJS.

With CLIserver, there's no need to install anything in the project or to change a single line of code in the source files.

![A quick demo about CLIserver](.github/cliserver.gif)

## Prerequisites

* [`node.js`](https://nodejs.org/) (v10 or higher)

## Installation

### Using npx

You can use CLIserver directly with [`npx`](https://www.npmjs.com/package/npx).

```sh
npx cliserver serve . -l
```

### Global installation

```sh
npm install -g cliserver
cliserver serve . -l
```

### Local installation

In a `node.js` project you can install CLIserver locally and include it in your [development scripts](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#scripts).

```sh
npm install --save-dev cliserver
```

`package.json`:

```js
{
    // ...
    "scripts": {
        "dev": "cliserver serve . -l"
    }
}
```

```sh
npm run dev
```

## Usage

CLIserver is a command line tool with the following available commands:

### Help

Show the help.

```sh
cliserver --help
```

### Serve

Start a static webserver from a directory.

```sh
cliserver serve [directory]
```

#### Arguments:

| Short | Long | Type | Default | Description |
|---|---|---|---|---|
| `-p` | `--port` | number | 7100 | Port where the server  is listening |
| `-l` | `--livereload` | boolean | false | Reload page in the browser on file changes |
| `-o` | `--livereloadPort` | number | 35729 | Port where the livereload server is listening |
| `-f` | `--listenerFiles` | array | [ \<DIRECTORY\>/index.html ] | List of HTML files to reload on file changes |
| `-w` | `--watch` | array | [ \<DIRECTORY\> ] | Watch changes in files and directories |
| `-r` | `--root` | string | \<DIRECTORY\>/index.html | Default file to serve on the `/` route |
| `-d` | `--delay` | number | 250| Livereload delay on file file changes (millisecs) |

#### Examples

##### Basic usage: start a static webserver from a directory on the default port (`7100`)

```sh
cliserver serve ~/website
```

##### Start a server on port `8000` with livereload

```sh
cliserver serve ~/website -p 8000 -l
```

##### A complex example

Start a server on port `8000`, livereload is listening on port `35600`, 3 files are being reloaded on changes, but only on updates in the `css` or `img` directories, the server root is `default.html` and the livereload delay is 250 ms.

```sh
cliserver serve ~/website -p 8000 -l -o 35600 \
    -f ~/website/default.html -f ~/website/about.html -f ~/website/contact.html \
    -w ~/website/css -w ~/website/img \
    -r ~/website/default.html \
    -d 250
```

## Under the hood

CLIserver uses [Koa](https://koajs.com/) for the static server and [node-livereload](https://github.com/napcs/node-livereload) for livereloading.

## Alternatives

If you have `python` and don't need livereload, you don't have to install CLIserver. A good one-liner alternative to start a `HTTP` server from the current directory:

```sh
python3 -m http.server
```

## 🚫 Warning: do not use it in production

Please keep in mind that CLIserver is meant to be a small and quick development tool to speed up the feedback cycle when building static websites. Error handling, monitoring and performance optimalization is completely out of scope in this project.

To host a static website, consider using one of the [great](https://expressjs.com/) [frameworks](https://www.npmjs.com/package/koa-static) or check some [awesome](https://www.netlify.com/) hosting providers on the market.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

