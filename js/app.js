var app=angular.module("sportshop",["filters","ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/products",{templateUrl:"template/products.html"});
	$routeProvider.when("/checkout",{templateUrl:"template/checkout.html"});
	$routeProvider.otherwise({templateUrl:"template/products.html"});
});



app.controller("mainCtrl",function($scope,$http){
	$scope.result=[];
	$scope.totalCount=function(){
		$scope.totalPay=0;
		var sum=0;
		for(var i=0;i<$scope.result.length;i++){
			sum+=$scope.result[i].count;
			$scope.totalPay+=$scope.result[i].count*$scope.result[i].price;
		}
		return sum;
	}
});
app.directive("navBar",function(){//自定义指令:指令名为navBar,用于引入导航条文件(daohang.html)
	return {
		restrict:"EACM",
		templateUrl:"daohang.html"
	}
});