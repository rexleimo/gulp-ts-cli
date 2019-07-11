const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const srcDir = path.resolve(__dirname, 'src');

function getEntry() {
    let jsPath = path.resolve(srcDir, 'pages');
    let dirs = fs.readdirSync(jsPath);
    console.log(dirs);
    let matchs = [], files = {};
    dirs.forEach(function (item) {
        let path_js = path.resolve(jsPath, item);
        jsDirs = fs.readdirSync(path_js);
        jsDirs.forEach(function (js) {
            matchs = js.match(/(.+)\.ts$/);
            if (matchs) {
                files[matchs[1]] = path.resolve(path_js, js);
            }
        });
    });
    console.log(files);
    return files;
}

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: getEntry(),
    output: {
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {test: /\.ts?$/, loader: "awesome-typescript-loader"},
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    }
};
