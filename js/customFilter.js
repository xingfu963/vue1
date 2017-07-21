//module定义一个模块
var cf=angular.module("filters",[]);
cf.filter("unique",function(){
	return function(data){
		if(angular.isArray(data)){
			var norepeat=[];
			var obj={};//空对象,用处大大的;
			for(var i=0;i<data.length;i++){
				var category=data[i].category;
				if(angular.isUndefined(obj[category])){
					obj[category]=true;
					norepeat.push(category);
				}
			}
			return norepeat;
		}else{
			return [];
		}
	}
});