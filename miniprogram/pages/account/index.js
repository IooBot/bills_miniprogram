//index.js
import graphql from '../../common/graphql'
import account from '../../common/account'

let {querys,mutations}=graphql
let {createAccount,getAccount}=account

const app = getApp()

Page({
  data: {
    username:'',
    openid:''
  },

  onLoad: function() {
    console.log(app.globalData)
    this.setData({
      openid:app.globalData.openid
    })
  },
  input(e){
    console.log(e.detail)
    this.setData({
      username:e.detail
    })
  },
  save(){
   if(this.data.username.length==0){
    wx.showToast({
      title: '账户名不能为空',
      icon: 'success',
      duration: 1000
    })
   }else{
    let data={
      "id": new Date().getTime()+parseInt(Math.random(),10),
      "accountName": this.data.username,
      "createdAt": new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString().slice(2),
      "updateAt": "",
      "user_id": this.data.openid
    }
    console.log('data',data)
    this.createAccounts(data,createAccount) 
   }
  },
  //封装的函数
  createAccounts(data,mutation){
    mutations({data,mutation}).then((e)=>{
      console.log('createAccount',e)
    })
  }

})
