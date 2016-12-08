var Q = require('q');
var childProcess = require('child_process');
var asar = require('asar');
var jetpack = require('fs-jetpack');

var projectDir, buildDir, manifest, appDir;

function init() {
    projectDir = jetpack;
    buildDir = projectDir.dir('./dist', {empty: true});
    appDir = projectDir.dir('./build');
    manifest = appDir.read('./package.json', 'json');

    return Q();
}

function copyElectron() {
    return projectDir.copyAsync('./node_modules/electron-prebuilt/dist', buildDir.path(), {overwrite: true});
}

function cleanupRuntime() {
    return buildDir.removeAsync('resources/default_app');
}

function createAsar() {
    var deferred = Q.defer();
    asar.createPackage(appDir.path(), buildDir.path('resources/app.asar'), function(){
        deferred.resolve();
    });
    return deferred.promise;
}

function updateResource() {
    var deferred = Q.defer();

    projectDir.copy('resources/app.ico', buildDir.path('icon.ico'));
    var rcedit = require('rcedit');
    rcedit(buildDir.path('electron.exe'), {
        'icon' : projectDir.path('resources/app.ico'),
        'version-string': {
            'ProductName' : manifest.name,
            'FileDescription' : manifest.description
        }
    }, function(err){
        if(!err){
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function rename() {
    return buildDir.renameAsync('electron.exe', manifest.name + '.exe')
}

function build() {
    return init()
            .then(copyElectron)
            .then(cleanupRuntime)
            .then(createAsar)
            .then(updateResource)
            .then(rename);
}

module.exports = {build: build};
