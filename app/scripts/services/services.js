'use strict';

/* Services */


// Demonstrate how to register services
var app = angular.module('app.services', []);
app.factory('MyCV', function ($http) {

    var getResponse = function (filename) {
        return  $http.get(filename).then(function (response) {
            return response.data;
        });
    };
    return {
        skills: function () {
            return getResponse('data/skills.json');
        },
        experience: function () {
            return getResponse('data/experience.json');
        },
        ide: function () {
            return getResponse('data/ide.json');
        }
    };
});

app.factory('ChartUtils', function () {
    return {
        skillConfig: function (languages, experience) {
            return {
                options: {
                    chart: {
                        type: 'bar'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: languages,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Years Experience',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Languages/Frameworks',
                    data: experience
                }]
            };
        },
        ideConfig: function (ides, experience) {
            return {
                options: {
                    chart: {
                        type: 'column'
                    },
                    colors: ['#F7A35C'],
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: ides,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Years Experience',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'IDE',
                    data: experience
                }]
            };
        }
    };
});

