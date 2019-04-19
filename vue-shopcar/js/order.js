 var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkALlFlag:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
		fomatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView();
		})
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get("data/orderData.json",{"id":123}).then(function(res){
				_this.productList = res.data.result.list;
                for (var i=0;i<_this.productList.length;i++) {
                   var item =  _this.productList [i];
                    console.info(i +":"+item);
                     this.totalMoney += item.productPrice * item.productQuantity;
                }
			});
		}
	}
});
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })