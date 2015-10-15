/// <reference path="../defs/tsd.d.ts"/>
/// <reference path="../tasks/modules/interfaces.d.ts"/>
exports.decoratorMetadataPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.emitDecoratorMetadata === true &&
            options.experimentalDecorators === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected emitDecoratorMetadata === true and experimentalDecorators === true";
    });
};
exports.decoratorMetadataNotPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.emitDecoratorMetadata === undefined) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected emitDecoratorMetadata === false, was " + options.emitDecoratorMetadata;
    });
};
exports.variablesReplacedForTSConfig = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var expected = "test/tsconfig/tsconfig-grunt-ts.json";
        if (options.tsconfig && options.tsconfig.tsconfig === expected) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected tsconfig file === " + expected + ", was " + options.tsconfig.tsconfig;
    });
};
exports.tsconfig_passThrough_onlySendsConfigThrough_WithPathAndAdditional = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var tscfg = options.tsconfig;
        if (tscfg
            && tscfg.passThrough
            && tscfg.tsconfig === 'test/tsconfig'
            && options.additionalFlags === '--someNewThing') {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --project .  The tsconfig was " + JSON.stringify(tscfg) + ".  AddlFlags was " + options.additionalFlags;
    });
};
exports.tsconfig_passThrough_onlySendsConfigThrough_WithoutPath = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var tscfg = options.tsconfig;
        if (tscfg && tscfg.passThrough && tscfg.tsconfig === '.') {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --project .  The tsconfig was " + JSON.stringify(tscfg);
    });
};
exports.variablesReplacedFor_vs = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var expected = "test/vsproj/testproject.csproj";
        if (options.vs && options.vs.project === expected) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected vs project file === " + expected + ", was " + options.vs.project;
    });
};
exports.experimentalDecoratorsPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.experimentalDecorators === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected experimentalDecorators === true";
    });
};
exports.noEmitPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.noEmit === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected noEmit === true";
    });
};
exports.noEmitNotPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.noEmit === undefined) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected noEmit === false, was " + options.noEmit;
    });
};
exports.inlineSourcesPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.inlineSources === true &&
            options.sourceMap === false &&
            options.inlineSourceMap === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        var result = JSON.stringify({
            inlineSources: options.inlineSources,
            sourceMap: options.sourceMap,
            inlineSourceMap: options.inlineSourceMap
        });
        throw "expected inlineSources and inlineSourceMap, but not sourceMap.  Got " + result;
    });
};
exports.inlineSourcesAndInlineSourceMapPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.inlineSources === true &&
            options.sourceMap === false &&
            options.inlineSourceMap === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        var result = JSON.stringify({
            inlineSources: options.inlineSources,
            sourceMap: options.sourceMap,
            inlineSourceMap: options.inlineSourceMap
        });
        throw "expected inlineSources and inlineSourceMap, but not sourceMap.  Got " + result;
    });
};
exports.inlineSourceMapPassedWithSourceMap = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.inlineSources === undefined &&
            options.sourceMap === false &&
            options.inlineSourceMap === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        var result = JSON.stringify({
            inlineSources: options.inlineSources,
            sourceMap: options.sourceMap,
            inlineSourceMap: options.inlineSourceMap
        });
        throw "expected inlineSourceMap only.  Got " + result;
    });
};
exports.inlineSourcesNotPassed = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.inlineSources === undefined && options.sourceMap === false) {
            resolve({
                code: 0,
                output: ""
            });
        }
        var result = JSON.stringify({
            inlineSources: options.inlineSources,
            sourceMap: options.sourceMap,
            inlineSourceMap: options.inlineSourceMap
        });
        throw "expected inlineSourcesPassed === undefined and sourceMap false.  Got " + result;
    });
};
exports.vsproj_test = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.sourceMap === true &&
            options.removeComments === false &&
            options.module === 'commonjs' &&
            options.CompilationTasks[0].outDir === 'test/vsproj/vsproj_test') {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected sourceMap === true, removeComments===" +
            "false, module===commonjs, outDir===vsproj_test.  Was " +
            JSON.stringify([options.sourceMap,
                options.removeComments, options.module, options.CompilationTasks[0].outDir]);
    });
};
exports.vsproj_test_config = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.sourceMap === false &&
            options.removeComments === true &&
            options.CompilationTasks[0].outDir.indexOf('vsproj_test_config') >= 0) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected sourceMap === false, removeComments===" +
            "true, outDir contains vsproj_test_config.  Was " +
            JSON.stringify([options.sourceMap,
                options.removeComments, options.CompilationTasks[0].outDir]);
    });
};
exports.param_newLine_CRLF = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.newLine === "CRLF") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected newLine=CRLF.  Was " +
            JSON.stringify([options.newLine]);
    });
};
exports.param_newLine_LF = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.newLine === "LF") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected newLine=LF.  Was " +
            JSON.stringify([options.newLine]);
    });
};
exports.files_testFilesUsedWithDestAsAFolder = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.CompilationTasks[0].outDir === "test/multifile/files_testFilesUsedWithDestAsAJSFolder" &&
            (options.CompilationTasks[0].out || "not specified") === "not specified") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --out not specified and outDir=test/multifile/files_testFilesUsedWithDestAsAJSFolder.  Was " +
            JSON.stringify([options.CompilationTasks[0].outDir]);
    });
};
exports.files_testFilesUsedWithDestAsAFile = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.CompilationTasks[0].out === "test/multifile/files_testFilesUsedWithDestAsAJSFile/testDest.js" &&
            (options.CompilationTasks[0].outDir || "not specified") === "not specified") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --outDir not specified and out=test/multifile/files_testFilesUsedWithDestAsAJSFile/testDest.js.  Was " +
            JSON.stringify([options.CompilationTasks[0].outDir]);
    });
};
exports.test_systemJS = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.module === "system") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected system.  Was " +
            JSON.stringify([options.module]);
    });
};
exports.test_umd = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.module === "umd") {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected umd.  Was " +
            JSON.stringify([options.module]);
    });
};
exports.test_isolatedModules = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.isolatedModules === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --isolatedModules.  Got " + JSON.stringify(options);
    });
};
exports.test_noEmitHelpers = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.noEmitHelpers === true) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --noEmitHelpers.  Got " + JSON.stringify(options);
    });
};
exports.test_additionalFlags = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.additionalFlags === '--version') {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected --version.  Got " + JSON.stringify(options);
    });
};
exports.bad_sourcemap_option = function (strings, options) {
    return new Promise(function (resolve, reject) {
        if (options.warnings.length > 0
            && options.warnings[0].indexOf("sourceMap") > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see a warning for bad sourceMap option.";
    });
};
exports.out_with_spaces = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1];
        if (command.indexOf('--out "test/out with spaces/out with spaces.js"') > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see relative path to out with spaces.js surrounded in quotes.";
    });
};
exports.files_showWarningIfFilesIsUsedWithSrcOrOut = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "Warning: In task \"files_showWarningIfFilesIsUsedWithSrcOrOut\", either" +
            " \"files\" or \"src\" should be used - not both.";
        if (command.indexOf('multifile/b/a.ts') > -1 &&
            command.indexOf('multifile/b/b.ts') > -1 &&
            command.indexOf('multifile/b/c.ts') > -1 &&
            command.indexOf('multifile/b/reference.ts') > -1 &&
            command.indexOf('multifile/a/a.ts') === -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see TypeScript files in multifile/b, but not multifile/a.  Also, expected " +
            "a warning about using src with files.";
    });
};
exports.files_showWarningIfFilesIsUsedWithSrcOrOutDir = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "Warning: In task \"files_showWarningIfFilesIsUsedWithSrcOrOutDir\", either" +
            " \"files\" or \"src\" should be used - not both.";
        if (command.indexOf('multifile/b/a.ts') > -1 &&
            command.indexOf('multifile/b/b.ts') > -1 &&
            command.indexOf('multifile/b/c.ts') > -1 &&
            command.indexOf('multifile/b/reference.ts') > -1 &&
            command.indexOf('multifile/a/a.ts') === -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see TypeScript files in multifile/b, but not multifile/a.  Also, expected " +
            "a warning about using src with files.";
    });
};
exports.files_showWarningIfFilesIsUsedWithVs = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "Warning: In task \"files_showWarningIfFilesIsUsedWithVs\", either \"files\" " +
            "or \"vs\" should be used - not both.";
        if (command.indexOf('multifile/a/a.ts') > -1 &&
            command.indexOf('multifile/a/b.ts') > -1 &&
            command.indexOf('multifile/a/c.ts') > -1 &&
            command.indexOf('multifile/a/reference.ts') > -1 &&
            command.indexOf('vsproj/vsprojtest1.ts') > -1 &&
            command.indexOf('multifile/b') === -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see TypeScript files in multifile/a and vsproj.  Also, expected " +
            "a warning about using vs with files.";
    });
};
exports.files_showWarningIfFilesIsUsedWithFast = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "Warning: target \"files_showWarningIfFilesIsUsedWithFast\" is attempting to use fast compilation with \"files\"." +
            "  This is not currently supported.  Setting \"fast\" to \"never\".";
        if (command.indexOf('multifile/a/a.ts') > -1 &&
            command.indexOf('multifile/a/b.ts') > -1 &&
            command.indexOf('multifile/a/c.ts') > -1 &&
            command.indexOf('multifile/a/reference.ts') > -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see TypeScript files in multifile/a and a warning about using src with files.";
    });
};
exports.files_testWarnIfFilesHasDestArray = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "Warning: target \"files_testWarnIfFilesHasDestArray\" has an array specified for the files.dest property." +
            "  This is not supported.  Taking first element and ignoring the rest.";
        if (command.indexOf('multifile/a/a.ts') > -1 &&
            command.indexOf('multifile/a/b.ts') > -1 &&
            command.indexOf('multifile/a/c.ts') > -1 &&
            command.indexOf('multifile/a/reference.ts') > -1 &&
            command.indexOf(',') === -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see TypeScript files in multifile/a and a warning about using an array for dest." +
            "There should be no commas in the command line (which would indicate the array was passed as an array).";
    });
};
exports.warnbothcomments = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expectedWarning = "WARNING: Option \"comments\" and \"removeComments\" should not be used together.  " +
            "The --removeComments value of false supercedes the --comments value of true";
        if (command.indexOf('test/abtest/reference.ts') > -1 &&
            command.indexOf('comments') === -1 &&
            command.indexOf('remove') === -1 &&
            options.warnings.indexOf(expectedWarning) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to not see removeComments passed.";
    });
};
exports.test_jsx = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expected = '--jsx preserve';
        if (command.indexOf(expected) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see " + expected + " in the command line and didn't.  Got this: " + command;
    });
};
exports.test_moduleResolution = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expected = '--moduleResolution classic';
        if (command.indexOf(expected) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see " + expected + " in the command line and didn't.  Got this: " + command;
    });
};
exports.test_experimentalAsyncFunctions = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expected = '--experimentalAsyncFunctions';
        if (command.indexOf(expected) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see " + expected + " in the command line and didn't.  Got this: " + command;
    });
};
exports.test_rootDir = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        var expected = '--rootDir test/simple';
        if (command.indexOf(expected) > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see " + expected + " in the command line and didn't.  Got this: " + command;
    });
};
exports.test_directoriesWithSpaces = function (strings, options) {
    return new Promise(function (resolve, reject) {
        var command = strings[1].replace(/\\/g, '/');
        if (command.indexOf("--rootDir \"test/rootDir with spaces\"") > -1 &&
            command.indexOf("--outDir \"test/outDir with spaces\"") > -1 &&
            command.indexOf("--sourceRoot \"test/sourceRoot with spaces\"") > -1 &&
            command.indexOf("--mapRoot \"test/mapRoot with spaces\"") > -1) {
            resolve({
                code: 0,
                output: ""
            });
        }
        throw "expected to see rootDir, outDir, sourceRoot, and mapRoot with quoted values in the command line and didn't.  Got this: " + command;
    });
};
//# sourceMappingURL=commandLineAssertions.js.map