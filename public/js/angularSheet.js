angular.module('app', [])

angular.module('app')
    .factory("gameFactory", [function(){
        var Game = function(name,creator,description,img){
            this.name = name;
            this.creator = creator;
            this.description = description;
            this.img = img
        }

        var Score = function(name,score){
            this.name = name;
            this.score = score
        }

        var gameBox = [
            new Game("Present Grabber","Drewbacca","Slide around and collect presents.  Watch out for flying chimneys!  Fun arcade action and retro music.","/assets/images/grabber-shot.png"),
            new Game("The Ancient Leaflets","Aaron Klopfenstein","Classic RPG from Fishesda studios.  Over 100,000 locations and 600,000 NPCS!","/assets/images/daggerfall.jpg"),
            new Game("Steel Bullet","Iron Dingo Daniels","Manic side scroller turns it up to 11!  Madness in over 50 levels.","/assets/images/slug.jpg")
        ]

        var scoreBox = [
            new Score("Drewbacca", 68),
            new Score("Iron Dingo", 61),
            new Score("maxwello", 55),
            new Score("Devaio", 43)
        ]
        return {
            gameBox    : gameBox,
            scoreBox   : scoreBox 
        }

    }])


angular.module('app')
	.controller('mainController', ['$scope', '$http', 'gameFactory', function($scope, $http, gameFactory){

        var s = $scope
        var h = $http
        s.gameBox = gameFactory.gameBox
        s.scoreBox = gameFactory.scoreBox
        s.signup = function(){
            console.log($scope.signupForm)
            h({
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                $scope.useName = returnData.data.username
                if ( returnData.data.success ) {window.location.href="/registered" }
            })
        }

        h.get('/api/people')
            .then(function(dataFromServer){
                s.peoples = dataFromServer.data;
                       })
                    
        h.get('/api/thisUser')
            .then(function(dataFromServer){
                s.useName = dataFromServer.username;
                       })

        s.login = function(){
            h({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) {window.location.href="/registered" } 
                else { console.log(returnData)}
            })
        }


	}])
	