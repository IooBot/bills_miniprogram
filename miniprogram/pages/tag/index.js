//index.js
import graphql from '../../common/graphql'
import account from '../../common/account'

let {querys,mutations}=graphql
let {createAccount,getAccount}=account

const app = getApp()

Page({
  data: {
    username:'',
    openid:'',
    array:['收入','支出'],
    array1:['吃饭','日常消费']
  },

  onLoad: function() {
    
  }

})
