//index.js
import Graphql from '../../common/graphql'
import User from '../../common/user'
import Account from '../../common/account'
import Bills from '../../common/bill'

let {querys,mutations}=Graphql
let {createUser,getUser}=User
let {getAccount,deleteAccount}=Account
let {getBill}=Bills

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    acountList:[],
    allIncome:'',
    allPay:'',
    bills:[],
    icon:'./user-unlogin.png',
    year:'年份',
    month:'月份',
    yearList:[],
    monthList:[]
  },

  onLoad: function() {
   
  },
  onShow(){
    this.getWeixinUser()
    this.getAccounts()
  },
  onChange(){
    this.getAccounts()
  },
  addCount(){
    wx.navigateTo({
      url: '/pages/account/index'
    })
  },
  toCreateBill(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/bills/index?account_id='+e.currentTarget.dataset.id
    })
  },
  toDeleteAccount(e){
    console.log(e.currentTarget.dataset.id)
    let data={
      id:e.currentTarget.dataset.id
    },
    mutation=deleteAccount
    mutations({data,mutation}).then((item)=>{
      this.getAccounts()
    })
  },
  toMyAccount(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/myAccount/index?account_id='+e.currentTarget.dataset.id
    })
  },
  //封装的函数
  billSort(arr){
    arr.sort((a,b)=>{
      return Date.parse(b.createdAt) - Date.parse(a.createdAt)
    })

    console.log('arr',arr)
    this.setData({
      bills:arr
    })

    let year=arr.map((item)=>{
      return new Date(item.createdAt).getFullYear()
    })
    let month=arr.map((item)=>{
      return new Date(item.createdAt).getMonth()+1
    })
    year=Array.from(new Set(year)).sort((a,b)=>{return a-b})||''
    month=Array.from(new Set(month)).sort((a,b)=>{return a-b})||''
    this.setData({
      monthList:month,
      yearList:year
    })
  },
  getAccounts(){
    let that=this,arrList=[];
    let data={
      user_id:app.globalData.openid
    },
    query=getAccount
    querys({data,query}).then((e)=>{
      console.log('getAccount',e.data.accountbyprops)
      arrList=e.data.accountbyprops

      for(let i=0;i<arrList.length;i++){
        let data={
          account_id:arrList[i].id
        },query=getBill,allIncome1=0,allPay1=0;
    
        that.getBills(data,query).then((e)=>{
          console.log('eee',e.data.billbyprops)
          e.data.billbyprops.map((item1)=>{
            
            if(item1.class=='pay'){
              allPay1+=item1.money
            }
            if(item1.class=="income"){
              allIncome1+=item1.money
            }

          })  
          arrList[i].collect={allPay1,allIncome1}  
          console.log('arrList',arrList) 
          that.setData({
            acountList:arrList
          }) 
        })
      }
    
      let allIncome=0;
      let allPay=0;
      let data={
      },
      query=getBill;
      that.getBills(data,query).then((e)=>{
        console.log('bills',e)
        that.billSort(e.data.billbyprops)
        e.data.billbyprops.map((item)=>{
          if(item.class=='pay'){
            allPay+=item.money
          }else if(item.class=='income'){
            allIncome+=item.money
          }
        })
        console.log(allIncome,allPay)
        that.setData({
          allIncome,
          allPay
        })
      })

    })
  },
  getBills(data,query){
    return querys({data,query}).then((e)=>{
      return e
    })
  },
  //获取微信用户信息
  getWeixinUser(){
    let that=this
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              console.log('res',res)
    
              that.getUsers({"openid":app.globalData.openid},getUser).then((e)=>{
                if(e.data.userbyprops==0){
                  this.creaUsers(res.userInfo,createUser)
                }
              })
            }
          })
        }
      }
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
  //创建用户
  creaUsers(userInfo,mutation){
    let data = {
      "avatar": userInfo.avatarUrl,
      "createdAt": new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "id": new Date().getTime()+parseInt(Math.random()*10000,10),
      "openid": app.globalData.openid,
      "password": "String",
      "updateAt": "String",
      "username": userInfo.nickName
    }
    mutations({data,mutation}).then((e)=>{
      console.log('createUser',e)
    })
  },
  //从数据库中获取用户
  getUsers(data,query){
    return querys({data,query}).then((e)=>{
      console.log('getUser',e)
      return e
    })
  },
  //获取汇总账单
  getCollects(){
    
  }
})
