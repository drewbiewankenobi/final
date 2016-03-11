
angular.module('app', [])

angular.module('app')
	.controller('mainController', ['$scope', '$http', function($scope, $http){

        $scope.signup = function(){
            console.log($scope.signupForm)
            $http({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { window.location.href="/" }
            })
        }


        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/" } 
                else { console.log(returnData)}
            })
        }

	}])
	