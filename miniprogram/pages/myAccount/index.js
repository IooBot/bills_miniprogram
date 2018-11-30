//index.js
import Graphql from '../../common/graphql'
import Collect from '../../common/collect'
import Account from '../../common/account'
import Bills from '../../common/bill'

let {
  querys,
  mutations
} = Graphql
let {
  getAccount,
  deleteAccount,
  getAccountById
} = Account
let {
  getBill,
  deleteBill,
  createBill
} = Bills
let {
  createCollect
} = Collect


const app = getApp()

Page({
      data: {
        avatarUrl: './user-unlogin.png',
        acount: {},
        allIncome: '',
        allPay: '',
        bills: [],
        icon: './user-unlogin.png',
        account_id: '',
        year:'年份',
        month:'月份',
        yearList:[],
        monthList:[]
      },

      onLoad: function (option) {
        console.log(option.account_id)
        this.steAccount(option)
        this.getAccounts()
        this.getBills()
      },
      onShow() {
        this.getBills()
      },
      deleteBill(e) {
        console.log(e.currentTarget.dataset.id)
        let data = {
            id: e.currentTarget.dataset.id
          },
          //删除订单
          mutation = deleteBill
        mutations({
          data,
          mutation
        }).then((item) => {
          this.getBills()
        })

      },
      toCreateBill() {
        wx.navigateTo({
          url: '/pages/bills/index?account_id=' + this.data.account_id
        })
      
      },
      bindYearChange(e){
        console.log(e.detail.value)

        let year=this.data.yearList[e.detail.value]

        this.setData({
          year
        })
        let billArr=this.data.bills,allIncome=0,allPay=0,
            minAt=new Date((year+'/1/1')).getTime()-0,
            maxAt=new Date((year+'/12/31')).getTime()-0;

        billArr.map((item)=>{
          let createdAt=new Date(item.createdAt).getTime()-0
          if(createdAt>=minAt&&createdAt<=maxAt){
            if(item.class=='income'){
              allIncome+=item.money
            }else{
              allPay+=item.money
            }
          }
        })
        this.setData({
          allIncome,
          allPay
        })

      },
      bindMonthChange(e){
        let that =this,month=this.data.monthList[e.detail.value];
        this.setData({
          month
        })

        let billArr=this.data.bills,allIncome=0,allPay=0,
            minAt=new Date((that.data.year+'/'+month+'/1')).getTime()-0,
            maxAt=new Date((that.data.year+'/'+month+'/31')).getTime()-0;

        billArr.map((item)=>{
          let createdAt=new Date(item.createdAt).getTime()-0
          if(createdAt>=minAt&&createdAt<=maxAt){
            if(item.class=='income'){
              allIncome+=item.money
            }else{
              allPay+=item.money
            }
          }
        })
        this.setData({
          allIncome,
          allPay
        })


      },
      //封装的函数
      setDate(){
        let year =new Date().getFullYear()
        let month =new Date().getMonth()+1
        this.setData({
          year,
          month
        })
      },
      steAccount(option) {
        this.setData({
          account_id: option.account_id
        })
      },
      getAccounts() {
        let that = this,
          arrList = [];
        let data = {
            id: that.data.account_id
          },
          query = getAccountById
        querys({
          data,
          query
        }).then((e) => {
          console.log('getAccount', e.data.accountbyid)
          this.setData({
            acount: e.data.accountbyid
          })
        })
      },

      getBills() {
        let allIncome = 0;
        let allPay = 0;
        let that = this,
          arrList = [];
        let data = {
            account_id: that.data.account_id
          },
          query = getBill
        querys({
          data,
          query
        }).then((e) => {
          console.log(e.data.billbyprops)
          e.data.billbyprops.map((item) => {
            if (item.class == 'pay') {
              allPay += item.money
            } else if (item.class == 'income') {
              allIncome += item.money
            }
          })
          console.log(allIncome, allPay)
          that.setData({
            allIncome,
            allPay
          })
          that.billSort(e.data.billbyprops)
        })
      },
      billSort(arr) {
        arr.sort((a, b) => {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        })

        console.log('arr', arr)
        this.setData({
          bills: arr
        })

        console.log('this.data.bills', this.data.bills)
        //
        //this.createCollects(arr)
        let year=arr.map((item)=>{
          return new Date(item.createdAt).getFullYear()
        })
        let month=arr.map((item)=>{
          return new Date(item.createdAt).getMonth()+1
        })
        year=Array.from(new Set(year)).sort((a,b)=>{return a-b})||[]
        month=Array.from(new Set(month)).sort((a,b)=>{return a-b})||[]
        this.setData({
          monthList:month,
          yearList:year
        })

        
        //console.log('year', year,'month',month)

      },
      //汇总用户账单,待定
      createCollects(arr) {

        /* let data = {
          "account_id": "dada",
          "allIncome": 100,
          "allPay": 60,
          "createdAt": "2014",
          "id": "dasdd",
          "month": "12",
          "remark": "String",
          "updateAt": "2012",
          "user_id": "adda",
          "year": "2014"
        }
              
        let mutation=createCollect
        mutations({data,mutation}).then((item)=>{
          this.getBills()
        }) */
  }
})