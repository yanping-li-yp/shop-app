// 返回上一页
function $back(to='-1'){
	this.$router.go(to);
}

// 跳转全局函数
function $navto(name, params={}, type=1){
	if(type == 1){
		this.$router.push(name, params);
	}else {
		this.$router.push({
			name: name,
			params: params
		})
	}
}

// 本地缓存
function $cache_set(name, params) {
	localStorage.setItem(name, JSON.stringify(params));
}

// 获取本地缓存
function $cache_get(name){
	let item = localStorage.getItem(name);
	if(item != null && item != ''){
		return JSON.parse(item)
	}
}


// 计算购物车长度
function $get_cart_length(){
	let totalGoods = JSON.parse(localStorage.getItem('cart'))
	if(totalGoods == 0 || totalGoods == '' || totalGoods == undefined){
		totalGoods = '';
		return totalGoods;
	}else{
		return totalGoods.length;
	}
}




export default {
	$navto,
	$back,
	$cache_set,
	$cache_get,
	$get_cart_length,
}

// vue调用： $back()
// js调用： this.$back()