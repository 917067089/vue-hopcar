new Vue({
    el:'.address',
    data:{//vue的事件模型
        addressList:[],
        limitNumber:3,
        currentIndex:0,
        shoppingMethod:1,
        pindex:0,
        delFlag:false,
        editFalg:false,
        address: { addressId: 0, userName: '', streetName: '', postCode: '', tel: '',isDefault:false }

    },
    filters:{
    },
    mounted:function(){//钩子函数
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{//实时计算
        filterAddress:function() {
            return this.addressList.slice(0,this.limitNumber);//截取0到3个数据
        }
    },
    methods: {//事件绑定的方法
        getAddressList: function () {//列表显示所有数据
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if (res.status == "0") {
                    _this.addressList = res.result;
                }
            });
        },
        alipay: function () {//删除方法
            $("#app").val();
            this.addressList.splice(this.pindex, 1);
            this.delFlag = false;
        }
    }
});