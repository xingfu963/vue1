var app=angular.module("sportshop");
app.controller("checkoutCtrl",function($scope){
//每一个控制器controller都自带一个$scope,每个控制下的$scope都是独立的
	$scope.delete=function(product){
		for(var i=0;i<$scope.result.length;i++){
			if($scope.result[i].id==product.id){
				$scope.result.splice(i,1);
				break;
			}
		}
	}
});