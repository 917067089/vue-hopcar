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
            if(this.shoppingMethod == 1){
                var _this = this;
                this.$http.get("data/orderData.json",{"id":123}).then(function(res){
                    _this.productList = res.data.result.list;
                    for (var i=0;i<_this.productList.length;i++) {
                        var item =  _this.productList [i];
                        console.info(i +":"+item);
                    }
                });
            }else if( '2'.indexOf(this.shoppingMethod)>=0 ){
                var _this = this;
                _this.productList = [];
                this.$http.get("data/orderData.json",{"id":123}).then(function(res){
                    var commoditys = [];
                    commoditys = res.data.result.list;[]
                    for (var i=0;i<commoditys.length;i++) {
                        var item = commoditys [i];
                        if(item.productName.indexOf("烟")>=0){
                            _this.productList.push(item);
                        }
                    }
                });

            }else if(this.shoppingMethod == 3){
                var _this = this;
                _this.productList = [];
                this.$http.get("data/orderData.json",{"id":123}).then(function(res){
                    var commoditys = [];
                    commoditys = res.data.result.list;[]
                    for (var i=0;i<commoditys.length;i++) {
                        var item = commoditys [i];
                        if(item.productName.indexOf("宝")>=0){
                            _this.productList.push(item);
                        }
                    }
                });
            }else if(this.shoppingMethod == 4){
                this.productList=[]
            }

        },//删除订单
        addProduct:function(){
            this.delFlag=false;
        }
    }
});