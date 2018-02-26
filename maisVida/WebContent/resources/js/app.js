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
    
    // editar  
	.when("/medicoedit/:id", {
		controller : "medicoController",
		templateUrl : "medico/cadastro.html"
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
            
            if($scope.medico.ativo == true) {
            	$scope.ativo = "Sim";
            }else{
            	$scope.ativo = "Não";
            }
            
        }).error(function(data, status, headers, config) {
            erro("Error buscarMedico : " + status);
        });
    } else {
        $scope.medico = {};
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
            sucesso('salvo com sucesso');
        }).error(function(response) {
        	erro('Error salvar' + status);
        });
    };
    
    // remover médico
	$scope.removerMedico = function(codMedico) {
		$http.delete("medico/deletar/" + codMedico).success(function(response){
			$scope.listarMedicos();
			sucesso("Apagado com sucesso");
		}).error(function(data, status, headers, config){
			erro("Error deletar: " + status);
		});
	}; 

    // visualizar médico	
    $scope.visualizarMedico = function(id) {
        $location.path('medicovisualizar/' + id);
    };
    
    // editar médico	
    $scope.editarMedico = function(id) {
        $location.path('medicoedit/' + id);
    };
    
    carregarCidadesEstados();


});

function carregarCidadesEstados() {
	$.getJSON('resources/js/estados_cidades.json', function(data) {

        var items = [];
        var options = '<option value="">Selecione...</option>';

        $.each(data, function(key, val) {
            options += '<option value="' + val.sigla + '">' + val.sigla + '</option>';
        });
        $("#estados").html(options);

        $("#estados").change(function() {

            var options_cidades = '';
            var str = "";

            $("#estados option:selected").each(function() {
                str += $(this).text();
            });

            $.each(data, function(key, val) {
                if (val.sigla == str) {
                    $.each(val.cidades, function(key_city, val_city) {
                        options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                    });
                }
            });

            $("#cidades").html(options_cidades);

        }).change();

    });
};

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