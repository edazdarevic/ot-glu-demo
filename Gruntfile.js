//var es6ify = require('es6ify');

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            demo: {
                src: ['app/app.js'],
                dest: 'demo/app.bundle.js',
                options: {
                    browserifyOptions: {
                        standalone: 'APP',
                        debug: true

                    },
                    transform: ['babelify'],
                    watch: true,
                    postBundleCB: function (err, src, next) {
                        if (err) {
                            throw err;
                        }
                        var through = require('through');
                        var stream = through().pause().queue(src).end();
                        var buffer = '';

                        stream.pipe(require('mold-source-map').transformSourcesRelativeTo(__dirname + '/demo')).pipe(through(function (chunk) {
                            buffer += chunk.toString();
                        }, function () {
                            next(err, buffer);
                        }));
                        stream.resume();
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 5555,
                    base: 'demo',
                    middleware: function (connect) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect['static']('demo')
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/geoserver',
                        host: 'spice.socialexplorer.com',
                        port: 80,
                        https: false,
                        changeOrigin: false,
                        xforward: false
                    },
                    {
                        context: '/SpiceMap',
                        host: 'spice.socialexplorer.com',
                        port: 80,
                        https: false,
                        changeOrigin: false,
                        xforward: false
                    }
                ]
            }
        },
        //watch: {
        //files: ['demo/arc.bundle.js'],
        //tasks: ['jsbeautifier', 'browserify']
        //},
        concurrent: {
            watchAndServer: ['watch', 'connect:server:keepalive']
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/',
                    outdir: 'docs/'
                }
            }
        },
        jshint: {
            allFiles: [
                'Gruntfile.js',
                'src/**/*.js'
//                '!src/project/*.js',
                //'demo/demoApp.js'
            ],
            options: grunt.file.readJSON('.jshintrc')
        },
        jsbeautifier: {
            src: ['src/**/*.js'],
            options: {
                js: {
                    braceStyle: 'collapse',
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: true,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 2,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('deploy', ['browserify']);
    grunt.registerTask('dev', ['browserify:demo', 'connect:server:keepalive']);
};
