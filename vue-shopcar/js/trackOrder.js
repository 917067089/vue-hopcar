var vm=new Vue({
    el:".container",
    data:{
        totalMoney:0,
        productList:[],
        checkALlFlag:false,
        delFlag:false,
        editFalg:false,
        curProduct:'',
        shoppingMethod:1,
    },
    filters:{
        fomatMoney:function(value){
            return "￥"+value.toFixed(2);
        },
        formatDate:function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            vm.cartView();
        })
    },
    methods:{
        cartView:function(){
            var orderId= generateUUID().substring(1,20);
            this.totalMoney=0;
            if(this.shoppingMethod == 1){
                var _this = this;
                this.$http.get("data/orderData.json",{"id":123}).then(function(res){
                    _this.productList = res.data.result.list;
                    for (var i=0;i<_this.productList.length;i++) {
                        var item =  _this.productList [i];
                        console.info(i +":"+item);
                        _this.$set(item,"orderId",orderId);//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                        _this.$set(item,"date",new Date());//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                        this.totalMoney += item.productPrice * item.productQuantity;
                    }
                });
            }else if(this.shoppingMethod == 2){
                var _this = this;
                this.$http.get("data/orderData.json",{"id":123}).then(function(res){
                    _this.productList = res.data.result.list;
                    for (var i=0;i<_this.productList.length;i++) {
                        var item =  _this.productList [i];
                        console.info(i +":"+item);
                        _this.$set(item,"orderId",orderId);//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                        _this.$set(item,"date",new Date());//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                        _this.$set(item,"status","待使用");//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                        this.totalMoney += item.productPrice * item.productQuantity;
                    }
                });

            }else if(this.shoppingMethod == 3){
                this.productList=[]
            }else if(this.shoppingMethod == 4){
                this.productList=[]
            }
            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                });
                return uuid;
            };
        },//删除订单
        delProduct:function(){
            this.productList.splice(this.pindex, this.productList.length);
            this.delFlag=false;
        },
        userProdect:function () {
            var con;
            con=confirm("你是否要使用?"); //在页面上弹出对话框
        }
    }
});
Vue.filter("money",function(value,type){
    return "￥"+value.toFixed(2)+type;
})