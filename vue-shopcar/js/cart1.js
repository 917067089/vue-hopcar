var vm = new Vue({
    el:"#app",//监听的范围
    data:{//模型
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false
    },
    filters:{//过滤器，有区部的和全局的Vue.filter();
        fomatMoney:function(value){
            return "￥ "+value.toFixed(2);
        }
    },
    mounted:function(){//生命周期
        this.$nextTick(function() {
            vm.cartView1();
        });
    },
    methods:{//所有的事件绑定都在method里面进行
        //显示购物车的信息
        cartView1:function () {
            var _this=this;
           vm.$http.get("data/cartData.json",{"id":123}).then(function (res) {
               _this.productList = res.data.result.list;
               // _this.totalMoney=res.data.result.totalMoney;
           });
        },
        //购物车增减个数
        changeMoney:function (product,way) {
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            this.calcTotalPrice();
        },
        //购物车前面的按钮是否选中
        selectedProduct:function (item) {
            if(typeof item.checked == 'undefined'){//判断一个对象是否存在
                Vue.set(item,"checked",true);//通过全局变量向item实体中注册一个checked的属性，他的值是true
                // this.$set(item,"checked",true);//通过局部的变量向item实体中注册一个checked的属性，他的值是true
            }else{
                item.checked = !item.checked;//取反
            }
            this.calcTotalPrice();
        },
        //购物车里面全选和取消全选
        checkAll:function (flag) {

           this.checkAllFlag=!this.checkAllFlag;
           var _this=this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == 'undefined'){//判断一个对象是否存在
                    // Vue.set(item,"checked",true);//通过全局变量向item实体中注册一个checked的属性，他的值是true
                    _this.$set(item,"checked",_this.checkAllFlag);//通过局部的变量向item实体中注册一个checked的属性，他的值是true
                }else{
                    item.checked = _this.checkAllFlag;
                }
            })
            this.calcTotalPrice();
        },
        //计算总金额
        calcTotalPrice:function () {
            var _this=this;
            this.totalMoney=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productQuantity * item.productPrice;
                }
            })
        },
        //购物车删除操作
        delProduct:function(){
            this.productList.splice(this.pindex,1);
            this.delFlag=false;
        }
    }
});
/*Vue.filter("money",function (value,type) {
    return "￥ "+value.toFixed(2)+type;
})*/
