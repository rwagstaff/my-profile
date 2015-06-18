angular.module('services.config', [])
    .constant('configuration', {
        appServerUrl: 'http://localhost:8080/',
        appServerTimeout: 60000
    });