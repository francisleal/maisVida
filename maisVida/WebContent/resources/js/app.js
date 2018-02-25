// configuração do módulo
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']);

// configurando rotas
app.config(function($routeProvider) {

    // listar
    $routeProvider.when("/medicolist", {
        controller: "medicoController",
        templateUrl: "medico/list.html"
    })

    // visualizar médio
    .when("/medicovisualizar/:id", {
        controller: "medicoController",
        templateUrl: "medico/visualizar.html"
    })

    // novo
    .when("/medico/cadastro", {
        controller: "medicoController",
        templateUrl: "medico/cadastro.html"
    })

    .otherwise({
        redirectTo: "/"
    });

});

app.controller('medicoController', function($scope, $http, $location, $routeParams) {

    if ($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
        $http.get("medico/buscarmedico/" + $routeParams.id).success(function(response) {
            $scope.medico = response;
        }).error(function(data, status, headers, config) {
            erro("Error buscarcliente : " + status);
        });
    } else {
        $scope.cliente = {};
    }

    // listar todos os médicos
    $scope.listarMedicos = function() {
        $http.get("medico/listar").success(function(response) {
            $scope.data = response;
        }).error(function(response) {
            erro("Erro listar :" + response);
        });
    };

    // salvar médico
    $scope.salvarMedico = function() {
        $http.post("medico/salvar", $scope.medico).success(function(response) {
            $scope.medico = {};
            alert('salvo com sucesso');
        }).error(function(response) {
            alert('Error salvar' + status);
        });
    };

    // visualizar médico	
    $scope.visualizarMedico = function(id) {
        $location.path('medicovisualizar/' + id);
    };

});

function erro(texto) {
    $.notify({
        message: texto
    }, {
        type: 'danger',
        timer: 250
    });
}

function sucesso(texto) {
    $.notify({
        message: texto
    }, {
        type: 'success',
        timer: 250
    });
}