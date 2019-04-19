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
        showOrHide: function () {//more 方法触发事件
            this.limitNumber = this.addressList.length;
        },
        setDefault: function (addressId) {//卡片设置默认值
            this.addressList.forEach(function (item, index) {
                if (item.addressId == addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            });
        },
        delProduct: function () {//删除方法
            this.addressList.splice(this.pindex, 1);
            this.delFlag = false;
        },
        addProduct: function (event) {
			if (this.address.addressId == 0) {
				//设置当前新增行的Id
				this.address.addressId = this.addressList.length + 1;
				this.addressList.push(this.address);
			}
			//还原模板
            this.address= { addressId: 0, userName: '', streetName: '', postCode: '', tel: '', isDefault:false };
            this.editFalg=false;
        }
    }
});