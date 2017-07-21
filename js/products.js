//angular.module有两个作用:第一,创建一个新的模块;第二:获取已有模块;
//如果只有一个参数,代表我要获取某一模块,前提是之前定义过这个模块
//如果两个参数,表示要创建一个新的模块,第二个参数是一个数组,里面是一个一个字符串,每个字符串代表着一个已有的模块名称;表示新建的这个模块需要依赖这些模块
var app=angular.module("sportshop");
app.controller("productsCtrl",function($scope,$http){//$http是angular的一个服务,通过URL向服务器或者数据库 提交或者获取数据;
	$http({url:"php/getProducts.php",method:"GET"}).then(
		function(response){
			// console.log(response.data);
			$scope.products=response.data;
			$scope.findCategory=function(category){
				$scope.currentCatrgory=category;//用一个变量保存选中的分类的名称,用于后面的函数$scope.classOfSelectedCategory
				var result=[];
				if(category== "全部"){
					result=$scope.products;
				}else{
					for(var i=0;i<$scope.products.length;i++){
						if($scope.products[i].category==category){
							result.push($scope.products[i]);
						}
					}
				}
				$scope.categoryProducts=result;
				$scope.productsPerPage(1,3);
			}
			

			$scope.pages=function(numPerPage){
				var count=$scope.categoryProducts.length;
				var pagesArray=[];
				var totalPage=Math.ceil(count/numPerPage);
				for(var i=0;i<totalPage;i++){
					pagesArray.push(i+1);
				}
				return pagesArray;
			}

			$scope.productsPerPage=function(pageNum,numPerPage){
				$scope.pagenum=pageNum;//记录页码
				var startIndex=(pageNum-1)*numPerPage;//起始下标
				var endIndex=Math.min(pageNum*numPerPage,$scope.categoryProducts.length);//终止下标
				var result=[];
				for(var i=startIndex;i<endIndex;i++){
					result.push($scope.categoryProducts[i]);
				}
				$scope.pageProducts=result;
			}

			$scope.findCategory('全部');//此函数内部调用了$scope.productsPerPage方法,代码顺序需要放在后面


			// 判断当前选中的btn,选中则做相应的颜色变化btn-primary
			$scope.classOfSelectedCategory=function(category){
				return $scope.currentCatrgory==category?"btn-primary":"";
			}

			$scope.classOfSelectedBtnNum=function(pageNum){
				return $scope.pagenum==pageNum?"btn-primary":"";
			}

			//var result=[];//放到controller="mainCtrl"的$scope中,以便继承!!!
			$scope.addToCart=function(product){
				// console.log(product);
				var hasThisProduct=false;//假定购物车中没有这个商品
				for(var i=0;i<$scope.result.length;i++){
					if($scope.result[i].id==product.id){
						$scope.result[i].count++;
						hasThisProduct=true;//经验证,有这个商品
						break;
					}
				}
				if(hasThisProduct==false){
					$scope.result.push({id:product.id,name:product.name,price:product.price,count:1});
				}
				// result.push(product);
				console.log($scope.result);
			}




			// $scope.makeNorepeat=function(){
			// 	var norepeat=[];
			// 	var obj={};//空对象,用处大大的;
			// 	for(var i=0;i<$scope.products.length;i++){
			// 		var category=$scope.products[i].category;
			// 		if(angular.isUndefined(obj[category])){
			// 			obj[category]=true;
			// 			norepeat.push(category);
			// 		}
			// 	}
			// 	$scope.norepeat=norepeat;
			// }
			// $scope.makeNorepeat();

			// 自定义过滤器 在这里不起作用 需要单独建立一个模块!!!;
			// app.filter("unique",function(){
			// 	return function(data){
			// 		if(angular.isArray(data)){
			// 			var norepeat=[];
			// 			var obj={};//空对象,用处大大的;
			// 			for(var i=0;i<$scope.products.length;i++){
			// 				var category=$scope.products[i].category;
			// 				if(angular.isUndefined(obj[category])){
			// 					obj[category]=true;
			// 					norepeat.push(category);
			// 				}
			// 			}
			// 			return norepeat;
			// 		}else{
			// 			return [];
			// 		}
			// 	}
			// });




		},function(response){
			
		}
	)
});


