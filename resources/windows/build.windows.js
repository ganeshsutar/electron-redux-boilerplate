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

    projectDir.copy('resources/windows/app.ico', buildDir.path('icon.ico'));
    var rcedit = require('rcedit');
    rcedit(buildDir.path('electron.exe'), {
        'icon' : projectDir.path('resources/windows/app.ico'),
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

function createInstaller() {
    var deferred = Q.defer();

    function replace(str, patterns) {
        Object.keys(patterns).forEach(function(pattern){
            console.log(pattern);
            var matcher = new RegExp('{{' + pattern + '}}', 'g');
            str = str.replace(matcher, patterns[pattern]);
        });

        return str;
    }

    var installScript = projectDir.read('resources/windows/installer.msi');
    installScript = replace(installScript, {
        name: manifest.name,
        productName: manifest.name,
        version: manifest.version,
        src: buildDir.path(),
        dest: projectDir.path(),
        icon: buildDir.path('icon.ico'),
        setupIcon: buildDir.path('icon.ico'),
        banner: projectDir.path('resources/windows/banner.bmp')
    });
    buildDir.write('installer.nsi', installScript);
    
    var nsis = childProcess.spawn('makensis', [buildDir.path('installer.nsi')], {
        stdio: inherit
    });

    nsis.on('error', function(err){
        if(err.message === 'spawn makensis ENOENT') {
            throw "Can't find NSIS. Are you sure you've installed it and added to PATH env variable?";
        } else {
            throw err;
        }
    });

    nsis.on('close', function(){
        deferred.resolve();
    });

    return deferred.promise;
}

function build() {
    return init()
            .then(copyElectron)
            .then(cleanupRuntime)
            .then(createAsar)
            .then(updateResource)
            .then(rename)
            .then(createInstaller);
}

module.exports = {build: build};
