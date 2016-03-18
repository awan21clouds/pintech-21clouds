/**
 * Created by RizqyFahmi on 18/03/2016.
 */
var app = angular.module('pintech', []);
//
//app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
//    $routeProvider
//        .when('/', {
//            //template:'welcome user'
//        }).when('/anotherPage', {
//        template:'welcome user again'
//    }).otherwise({
//        redirectTo: '/'
//    });
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });
//}]);

app.controller('userController', function($scope, $http) {
    console.log('Hello world from controller');
    var reset = function(){
        $scope.user = null
    }
    var login = function(){
        $http.post('/user/login', $scope.user).success(function(resUser){
            if(resUser==null){
                alert("Error! Username and password doesn't match!");
            }else{
                $http.post('/setSession', JSON.stringify(resUser)).success(function(response2){
                    //console.log(response2);
                    reset();
                    window.location = "/dashboard";
                });
            }
        });
    }


    $scope.register = function(){
        var user = $scope.user;
        if(user.password==user.repassword){
            $http.post('/user/register', $scope.user).success(function(response){
                login();
                reset();
            });
        }else{
            alert('passwords is not match!');
        }

    }

    $scope.login = function(){
        login();
    }
});


app.controller('pinController', function($scope, $http) {
    console.log('Hello world from controller');
    var reset = function(){
        $scope.pin = null
    }

    var refresh = function(){
        $http.get('/pin/read').success(function(response){
            $scope.pins = response;
        });
    }

    var refreshMyPins = function(){
        $http.get('/pin/readMyPins').success(function(response){
            $scope.myPins = response;
        });
    }

    $scope.save = function(){
        $http.post('/pin/save', $scope.pin).success(function(response){
            refreshMyPins();
            reset();
        });
    }

    $scope.delete = function(id){
        $http.delete('/pin/delete/'+id).success(function(response){
            refreshMyPins();
        });
    }

    refresh();
    refreshMyPins();
});


app.controller('settingController', function($scope, $http) {
    console.log('Hello world from setting controller');

    var getSetting = function(){
        $http.get('/setting/read').success(function(response){
            $scope.user = response;
        });
    }

    $scope.update = function(){
        $http.put('/setting/update/'+$scope.user._id, $scope.user).success(function(res){
            getSetting();
        }).error(function(err){
            alert('err');
        });
    }

    getSetting();
});