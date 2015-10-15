/// <reference path="../defs/tsd.d.ts" />
var fs = require('fs');
var path = require('path');
var or = require('../tasks/modules/optionsResolver');
var utils = require('../tasks/modules/utils');
var grunt = require('grunt');
var config = {
    "minimalist": {
        src: ["**/*.ts", "!node_modules/**/*.ts"]
    },
    "has ES3 and sourceMap": {
        options: {
            target: 'es3',
            sourceMap: true
        }
    },
    "bad sourceMap capitalization": {
        options: {
            target: 'es3',
            sourcemap: true
        }
    },
    "sourceMap in wrong place": {
        options: {
            target: 'es3'
        },
        sourceMap: true
    },
    "tsconfig in wrong place": {
        options: {
            tsconfig: true
        }
    },
    "tsconfig in wrong place and wrong case": {
        options: {
            TSConfig: true
        }
    },
    "bad sourceMap capitalization in wrong place": {
        options: {
            target: 'es3'
        },
        sourcemap: true
    },
    "has ES6 and no sourceMap": {
        options: {
            target: 'es6',
            sourceMap: false
        }
    },
    "has outDir set to ./built": {
        outDir: './built',
        options: {
            target: 'es6',
            sourceMap: false
        }
    },
    "has outDir set to ./myOutDir": {
        outDir: './myOutDir'
    },
    "has outDir set to null": {
        outDir: null
    },
    "has outDir set to undefined": {
        outDir: undefined
    },
    "out has spaces": {
        out: "my folder/out has spaces.js"
    },
    "outDir has spaces": {
        outDir: "./my folder"
    },
    "reference set to ref1.ts": {
        reference: "ref1.ts"
    },
    "reference set to ref2.ts": {
        reference: "ref2.ts"
    },
    "reference set to null": {
        reference: null
    },
    "reference set to undefined": {
        reference: undefined
    },
    "vs minimalist": {
        vs: "test/vsproj/testproject.csproj"
    },
    "vs ignoreSettings Release": {
        vs: {
            project: "test/vsproj/testproject.csproj",
            config: "Release",
            ignoreSettings: true
        }
    },
    "vs Release": {
        vs: {
            project: "test/vsproj/testproject.csproj",
            config: "Release",
        }
    },
    "vs TestOutFile": {
        vs: {
            project: "test/vsproj/testproject.csproj",
            config: "TestOutFile",
        }
    },
    "tsconfig has true": {
        tsconfig: true
    },
    "tsconfig has specific file": {
        tsconfig: 'test/tsconfig/test_simple_tsconfig.json'
    },
    "tsconfig test exclude": {
        tsconfig: 'test/tsconfig/test_exclude_tsconfig.json'
    },
    "zoo": {
        src: ["test/simple/ts/**/*.ts"]
    },
    "use html templates": {
        options: {
            htmlVarTemplate: 'markup',
            htmlModuleTemplate: 'html',
            htmlOutputTemplate: '/* tslint:disable:max-line-length */ \n\
          export module <%= modulename %> {\n\
              export var <%= varname %> = \'<%= content %>\';\n\
          }\n',
            htmlOutDir: 'html/generated',
            htmlOutDirFlatten: true
        }
    }
};
function getConfig(name, asCopy) {
    if (asCopy === void 0) { asCopy = false; }
    if (asCopy) {
        // JSON serialize/deserialize is an easy way to copy rather than reference, but it will
        // omit undefined properties.
        return JSON.parse(JSON.stringify(config[name]));
    }
    return config[name];
}
exports.tests = {
    "Warnings and Errors Tests": {
        "Bad capitalization detected and fixed": function (test) {
            test.expect(2);
            var result = or.resolveAsync(null, getConfig("bad sourceMap capitalization")).then(function (result) {
                var allWarnings = result.warnings.join('\n');
                test.ok(allWarnings.indexOf('Property "sourcemap" in target "" options is incorrectly cased; it should be "sourceMap"') > -1);
                test.strictEqual(result.sourcemap, undefined);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Option in wrong place detected": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("sourceMap in wrong place")).then(function (result) {
                var allWarnings = result.warnings.join('\n');
                test.ok(allWarnings.indexOf('Property "sourceMap" in target "" is possibly in the wrong place and will be ignored.  It is expected on the options object.') > -1);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "tsconfig in wrong place detected and warns": function (test) {
            test.expect(2);
            var result = or.resolveAsync(null, getConfig("tsconfig in wrong place")).then(function (result) {
                var allWarnings = result.warnings.join('\n');
                test.ok(allWarnings.indexOf('Property "tsconfig" in target "" is possibly in the wrong place and will be ignored.  It is expected on the task or target, not under options.') > -1);
                test.strictEqual(allWarnings.indexOf('It is also the wrong case and should be tsconfig'), -1, 'expect to not find warning about case.');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "tsconfig in wrong place and wrong case detected and warns": function (test) {
            test.expect(2);
            var result = or.resolveAsync(null, getConfig("tsconfig in wrong place and wrong case")).then(function (result) {
                var allWarnings = result.warnings.join('\n');
                test.ok(allWarnings.indexOf('Property "TSConfig" in target "" is possibly in the wrong place and will be ignored.  It is expected on the task or target, not under options.') > -1);
                test.ok(allWarnings.indexOf('It is also the wrong case and should be tsconfig') > -1);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Option in wrong place and wrong case detected": function (test) {
            test.expect(2);
            var result = or.resolveAsync(null, getConfig("bad sourceMap capitalization in wrong place")).then(function (result) {
                var allWarnings = result.warnings.join('\n');
                test.ok(allWarnings.indexOf('Property "sourcemap" in target "" is possibly in the wrong place and will be ignored.  It is expected on the options object.') > -1);
                test.ok(allWarnings.indexOf('It is also the wrong case and should be sourceMap') > -1);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        }
    },
    "Special processing Tests": {
        "path with spaces gets enclosed in double-quotes": function (test) {
            test.expect(1);
            var result = utils.enclosePathInQuotesIfRequired("this is a path/path.txt");
            test.strictEqual(result, "\"this is a path/path.txt\"");
            test.done();
        },
        "path that is already enclosed in double-quotes is unchanged": function (test) {
            test.expect(1);
            var result = utils.enclosePathInQuotesIfRequired("\"this is a path/path.txt\"");
            test.strictEqual(result, "\"this is a path/path.txt\"");
            test.done();
        },
        "path without spaces is unchanged": function (test) {
            test.expect(1);
            var result = utils.enclosePathInQuotesIfRequired("thisIsAPath/path.txt");
            test.strictEqual(result, "thisIsAPath/path.txt");
            test.done();
        },
        "out with spaces gets escaped with double-quotes": function (test) {
            test.expect(1);
            var files = [getConfig("out has spaces")];
            var result = or.resolveAsync(null, getConfig("out has spaces"), null, files).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].out, "\"my folder/out has spaces.js\"");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "outDir with spaces gets escaped with double-quotes": function (test) {
            test.expect(1);
            var files = [getConfig("outDir has spaces")];
            var result = or.resolveAsync(null, getConfig("outDir has spaces"), null, files).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].outDir, "\"./my folder\"");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "html features are resolved correctly": function (test) {
            test.expect(5);
            var cfg = getConfig("use html templates");
            var result = or.resolveAsync(null, cfg, null).then(function (result) {
                test.strictEqual(result.htmlModuleTemplate, "html");
                test.strictEqual(result.htmlVarTemplate, "markup");
                test.ok(result.htmlOutputTemplate.indexOf('export module <%= modulename %> {\n') > -1);
                test.strictEqual(result.htmlOutDir, "html/generated");
                test.strictEqual(result.htmlOutDirFlatten, true);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        }
    },
    "Precedence and defaults override Tests": {
        "The grunt-ts defaults come through when not specified": function (test) {
            test.expect(2);
            var result = or.resolveAsync(null, getConfig("minimalist")).then(function (result) {
                test.strictEqual(result.target, "es5");
                test.strictEqual(result.fast, "watch");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Task properties should override grunt-ts defaults if not specified on the target": function (test) {
            test.expect(2);
            var result = or.resolveAsync(getConfig("reference set to ref1.ts"), getConfig("minimalist")).then(function (result) {
                test.strictEqual(getConfig("minimalist").outDir, undefined);
                test.strictEqual(result.reference, 'ref1.ts');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Target name is set if specified": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("minimalist"), "MyTarget").then(function (result) {
                test.strictEqual(result.targetName, "MyTarget");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Target name is default if not specified": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("minimalist")).then(function (result) {
                test.strictEqual(result.targetName, '');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Task options should override grunt-ts defaults if not specified in the target options": function (test) {
            test.expect(2);
            var result = or.resolveAsync(getConfig("has ES6 and no sourceMap"), getConfig("minimalist")).then(function (result) {
                test.strictEqual(result.target, "es6");
                test.strictEqual(result.sourceMap, false);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Properties specified on the target should override anything specified in the task and the grunt-ts defaults": function (test) {
            test.expect(1);
            var result = or.resolveAsync(getConfig("reference set to ref1.ts"), getConfig("reference set to ref2.ts")).then(function (result) {
                test.strictEqual(result.reference, "ref2.ts");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Explicit null specified on the target should override anything specified in the task and the grunt-ts defaults": function (test) {
            test.expect(1);
            var result = or.resolveAsync(getConfig("reference set to ref1.ts"), getConfig("reference set to null")).then(function (result) {
                test.strictEqual(result.reference, null);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Explicit undefined specified on the target should override anything specified in the task and the grunt-ts defaults": function (test) {
            test.expect(1);
            var files = [getConfig("has outDir set to undefined")];
            var result = or.resolveAsync(getConfig("reference set to ref1.ts"), getConfig("reference set to undefined")).then(function (result) {
                test.strictEqual(result.reference, undefined);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Properties on target `options` should override the task options `options` object and the grunt-ts defaults": function (test) {
            test.expect(2);
            var result = or.resolveAsync(getConfig("has ES6 and no sourceMap"), getConfig("has ES3 and sourceMap")).then(function (result) {
                test.strictEqual(result.target, "es3");
                test.strictEqual(result.sourceMap, true);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        }
    },
    "Visual Studio `vs` Integration Tests": {
        "Visual Studio properties should override the grunt-ts defaults ONLY": function (test) {
            test.expect(3);
            var cfg = getConfig("vs minimalist", true);
            cfg.options = { sourceMap: false };
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.removeComments, false);
                test.strictEqual(result.sourceMap, false);
                test.strictEqual(result.module, 'commonjs');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "If a particular grunt-ts setting is not specified in the gruntfile, and `ignoreSettings` is true, the grunt-ts defaults should be used for that setting": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("vs ignoreSettings Release")).then(function (result) {
                test.strictEqual(result.sourceMap, true, 'Since this csproj file\'s Release config sets sourceMap as false, if the setting is ignored, the grunt-ts default of true should come through.');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Any options specified on the target should override the Visual Studio settings": function (test) {
            test.expect(1);
            var cfg = getConfig("vs Release", true);
            cfg.outDir = "this is the test outDir";
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].outDir, "this is the test outDir");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Any 'options' options specified on the target should override the Visual Studio settings": function (test) {
            test.expect(1);
            var cfg = getConfig("vs Release", true);
            cfg.options = { removeComments: false };
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.removeComments, false);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "out in Visual Studio settings is converted from relative to project to relative to gruntfile.": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("vs TestOutFile")).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].out, "test/vsproj/test_out.js");
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "outDir in Visual Studio settings is converted from relative to project to relative to gruntfile.": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("vs minimalist")).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].outDir, 'test/vsproj/vsproj_test');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "paths to TypeScript files in Visual Studio project are converted from relative to project to relative to gruntfile.": function (test) {
            test.expect(1);
            var result = or.resolveAsync(null, getConfig("vs minimalist")).then(function (result) {
                test.strictEqual(result.CompilationTasks[0].src[0], 'test/vsproj/vsprojtest1.ts');
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        }
    },
    "tsconfig.json Integration Tests": {
        setUp: function (callback) {
            var jsonFiles = fs.readdirSync('test/tsconfig_artifact');
            jsonFiles.forEach(function (file) {
                if (utils.endsWith(file, '.json')) {
                    utils.copyFileSync(path.join('./test/tsconfig_artifact', file), path.join('./test/tsconfig', file));
                }
                ;
            });
            callback();
        },
        "Can get config from a valid file": function (test) {
            test.expect(1);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/full_valid_tsconfig.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.ok(true);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "ignoreSettings works": function (test) {
            test.expect(2);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = {
                tsconfig: './test/tsconfig/test_simple_tsconfig.json',
                ignoreSettings: true
            };
            var result = or.resolveAsync(null, cfg).then(function (result) {
                // test.ok(true);
                test.strictEqual(result.target, 'es5');
                test.strictEqual(result.module, undefined);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Exception from invalid file": function (test) {
            test.expect(1);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/invalid_tsconfig.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.ok(false, 'expected exception from invalid file.');
                test.done();
            }).catch(function (err) {
                test.ok(err.indexOf('Error parsing') > -1);
                test.done();
            });
        },
        "No exception from blank file": function (test) {
            test.expect(1);
            var expectedMemo = 'expected blank file to NOT throw an exception (should be treated as contents = {}).';
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/blank_tsconfig.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.ok(true, expectedMemo);
                test.done();
            }).catch(function (err) {
                test.ok(false, expectedMemo);
                test.done();
            });
        },
        "No exception from file with contents {}": function (test) {
            test.expect(1);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/empty_object_literal_tsconfig.json';
            var result = or.resolveAsync(null, cfg, "", null, null, grunt.file.expand).then(function (result) {
                test.ok(true);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "Exception from missing file": function (test) {
            test.expect(2);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/does_not_exist_tsconfig.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.ok(false, 'expected exception from missing file.');
                test.done();
            }).catch(function (err) {
                test.strictEqual(err.code, 'ENOENT');
                test.ok(err.path && err.path.indexOf('does_not_exist_tsconfig.json') > -1);
                test.done();
            });
        },
        "config entries come through appropriately": function (test) {
            test.expect(12);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/full_valid_tsconfig.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.target, 'es5');
                test.strictEqual(result.module, 'commonjs');
                test.strictEqual(result.declaration, false);
                test.strictEqual(result.noImplicitAny, false);
                test.strictEqual(result.removeComments, false);
                test.strictEqual(result.preserveConstEnums, false);
                test.strictEqual(result.suppressImplicitAnyIndexErrors, true);
                test.strictEqual(result.sourceMap, true);
                test.strictEqual(result.emitDecoratorMetadata, undefined, 'emitDecoratorMetadata is not specified in this tsconfig.json');
                test.strictEqual(result.CompilationTasks.length, 1);
                test.strictEqual(result.CompilationTasks[0].outDir, 'test/tsconfig/files');
                test.strictEqual(result.CompilationTasks[0].out, undefined);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "out comes through with a warning and is NOT remapped relative to Gruntfile.js": function (test) {
            test.expect(5);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/test_simple_with_out.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.CompilationTasks.length, 1);
                test.strictEqual(result.CompilationTasks[0].out, 'files/this_is_the_out_file.js');
                test.strictEqual(result.CompilationTasks[0].outDir, undefined);
                test.strictEqual(result.warnings.length, 1);
                test.ok(result.warnings[0].indexOf('Using `out` in tsconfig.json can be unreliable') > -1);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "outFile comes through appropriately and is remapped relative to Gruntfile.js": function (test) {
            test.expect(3);
            var cfg = getConfig("minimalist", true);
            cfg.tsconfig = './test/tsconfig/test_simple_with_outFile.json';
            var result = or.resolveAsync(null, cfg).then(function (result) {
                test.strictEqual(result.CompilationTasks.length, 1);
                test.strictEqual(result.CompilationTasks[0].out, 'test/tsconfig/files/this_is_the_outFile_file.js');
                test.strictEqual(result.CompilationTasks[0].outDir, undefined);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        },
        "most basic tsconfig with true works": function (test) {
            test.expect(12);
            var result = or.resolveAsync(null, getConfig("tsconfig has true")).then(function (result) {
                // NOTE: With tsconfig: true, this depends on the actual grunt-ts tsconfig so technically it could be wrong in the future.
                test.strictEqual(result.tsconfig.tsconfig, path.join(path.resolve('.'), 'tsconfig.json'));
                test.strictEqual(result.target, 'es5');
                test.strictEqual(result.module, 'commonjs');
                test.strictEqual(result.declaration, false);
                test.strictEqual(result.noImplicitAny, false);
                test.strictEqual(result.removeComments, false);
                test.strictEqual(result.preserveConstEnums, false);
                test.strictEqual(result.suppressImplicitAnyIndexErrors, true);
                test.strictEqual(result.sourceMap, true);
                test.strictEqual(result.emitDecoratorMetadata, undefined, 'emitDecoratorMetadata is not specified in this tsconfig.json');
                test.ok(result.CompilationTasks[0].src.indexOf('tasks/ts.ts') > -1);
                test.ok(result.CompilationTasks[0].src.indexOf('tasks/modules/compile.ts') > -1);
                test.done();
            }).catch(function (err) { test.ifError(err); test.done(); });
        }
    },
    "simple tsconfig with file path works": function (test) {
        test.expect(13);
        var result = or.resolveAsync(null, getConfig("tsconfig has specific file")).then(function (result) {
            test.strictEqual(result.tsconfig.tsconfig, 'test/tsconfig/test_simple_tsconfig.json');
            test.strictEqual(result.target, 'es6');
            test.strictEqual(result.module, 'amd');
            test.strictEqual(result.declaration, true);
            test.strictEqual(result.noImplicitAny, true);
            test.strictEqual(result.removeComments, false);
            test.strictEqual(result.preserveConstEnums, false);
            test.strictEqual(result.suppressImplicitAnyIndexErrors, true);
            test.strictEqual(result.sourceMap, false);
            test.strictEqual(result.emitDecoratorMetadata, true);
            test.strictEqual(result.experimentalDecorators, true);
            test.strictEqual(result.CompilationTasks[0].src.length, 1);
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/files/validtsconfig.ts') === 0);
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "src appends to files from tsconfig": function (test) {
        test.expect(3);
        var cfg = getConfig("tsconfig has specific file");
        var files = [{ src: ['test/simple/ts/zoo.ts'] }];
        var result = or.resolveAsync(null, getConfig("tsconfig has specific file"), null, files).then(function (result) {
            test.strictEqual(result.CompilationTasks[0].src.length, 2);
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/files/validtsconfig.ts') > -1);
            test.ok(result.CompilationTasks[0].src.indexOf('test/simple/ts/zoo.ts') > -1);
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "target settings override tsconfig": function (test) {
        test.expect(2);
        var cfg = getConfig("tsconfig has specific file", true);
        cfg.options.target = 'es3';
        var result = or.resolveAsync(null, cfg).then(function (result) {
            test.strictEqual(result.target, 'es3', 'this setting on the grunt-ts target options overrides the tsconfig');
            test.strictEqual(result.removeComments, false, 'this setting is not specified in the options so tsconfig wins over grunt-ts defaults');
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "If files and exclude, files will be used and exclude will be ignored.": function (test) {
        test.expect(1);
        var result = or.resolveAsync(null, getConfig("tsconfig has specific file")).then(function (result) {
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/otherFiles/other.ts') === -1);
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "if no files, but exclude, *.ts and *.tsx will be included except for the excluded files and folders": function (test) {
        test.expect(3);
        var cfg = getConfig("tsconfig test exclude");
        var result = or.resolveAsync(null, cfg, "", null, null, grunt.file.expand).then(function (result) {
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/otherFiles/other.ts') === 0);
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/files/validconfig.ts') === -1);
            var resultingTSConfig = utils.readAndParseJSONFromFileSync(cfg.tsconfig);
            test.ok(!('files' in resultingTSConfig), 'expected that grunt-ts would not add a files element.');
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "if no files and no exclude, *.ts and *.tsx will be included and files not added.": function (test) {
        test.expect(3);
        var cfg = getConfig("minimalist", true);
        cfg.tsconfig = './test/tsconfig/empty_object_literal_tsconfig.json';
        var result = or.resolveAsync(null, cfg, "", null, null, grunt.file.expand).then(function (result) {
            var resultingTSConfig = utils.readAndParseJSONFromFileSync(cfg.tsconfig);
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/otherFiles/other.ts') >= 0, 'expected other.ts');
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/files/validtsconfig.ts') >= 0, 'expexted validconfig.ts');
            test.ok(!('files' in resultingTSConfig), 'expected that grunt-ts would not add a files element.');
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "globs are evaluated and files maintained by default": function (test) {
        test.expect(5);
        var cfg = getConfig("minimalist", true);
        cfg.tsconfig = './test/tsconfig/simple_filesGlob_tsconfig.json';
        var result = or.resolveAsync(null, cfg, "", null, null, grunt.file.expand).then(function (result) {
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/otherFiles/other.ts') >= 0);
            test.ok(result.CompilationTasks[0].src.indexOf('test/tsconfig/files/validtsconfig.ts') >= 0);
            var resultingTSConfig = utils.readAndParseJSONFromFileSync(cfg.tsconfig);
            test.strictEqual(resultingTSConfig.files.length, 2, 'Expected two files.');
            test.ok(resultingTSConfig.files.indexOf('otherFiles/other.ts') >= 0);
            test.ok(resultingTSConfig.files.indexOf('files/validtsconfig.ts') >= 0);
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    },
    "option overwriteFilesGlob updates the filesGlob and the new glob results are included": function (test) {
        test.expect(5);
        var cfg = getConfig("zoo", true);
        cfg.tsconfig = {
            tsconfig: './test/tsconfig/simple_filesGlob_tsconfig.json',
            overwriteFilesGlob: true
        };
        var result = or.resolveAsync(null, cfg, "", null, null, grunt.file.expand).then(function (result) {
            test.ok(result.CompilationTasks[0].src.indexOf('test/simple/ts/zoo.ts') >= 0, 'expected to find zoo.ts');
            test.strictEqual(result.CompilationTasks[0].src.length, 1);
            var resultingTSConfig = utils.readAndParseJSONFromFileSync(cfg.tsconfig.tsconfig);
            test.strictEqual(resultingTSConfig.filesGlob[0], '../simple/ts/**/*.ts');
            test.ok(resultingTSConfig.files.indexOf('../simple/ts/zoo.ts') >= 0);
            test.strictEqual(resultingTSConfig.files.length, 1, 'expected a single item in the files array');
            test.done();
        }).catch(function (err) { test.ifError(err); test.done(); });
    }
};
//# sourceMappingURL=optionsResolverTests.js.map