//index.js
import Graphql from '../../common/graphql'
import Bill from '../../common/bill'
import Toast from '../../dist/toast/toast';



let {querys,mutations}=Graphql
let {createBill}=Bill

const app = getApp()

Page({
  data: {
    username:'',
    openid:'',
    bill: {
      "account_id": "",
      "class": "",
      "createdAt": "",
      "id": "",
      "money": 0,
      "remark": "",
      "tag_id": "",
      "updateAt": ""
    },
    tagName:'',
    array:['收入','支出'],
    _array:['income','pay'],
    array1:[1,2,3],
    _array1:[1,2,3]
  },

  onLoad: function(option) {
   console.log(option)
   this.setData({
    "bill.account_id":option.account_id
   })
  },
  save(){
    this.setData({
      "bill.createdAt":new Date().toLocaleDateString().split("/").join("-")+' '+new Date().toLocaleTimeString().slice(2),
      "bill.id":new Date().getTime()+parseInt(Math.random()*10000,10)
    })

    let data=this.data.bill,save=true
    let arr =['tag_id','class','money','remark']//Object.keys(data)
    console.log("arr",arr)

    for(let i=0;i<arr.length;i++){
      //console.log(arr[i])
      if(data[arr[i]]==''){
        console.log(data[arr[i]])
        save=false
      }
    }

    if(save){
      console.log('data',data)
      this.createBills(data)
    }else{
      Toast('内容不得为空');
    }
    
  },
  onClickClass(e){
    console.log(e.detail.value)
    this.setData({
      "bill.class":this.data._array[e.detail.value],
    })
  },
  onClickTag(e){
    console.log(e.detail.value)
    this.setData({
      "bill.tag_id":this.data._array1[e.detail.value]
    })
  },
  remarkChange(e){
    console.log(e.detail)
    this.setData({
      "bill.remark":e.detail
    })
  },
  moneyChange(e){
    console.log(e.detail)
    this.setData({
      "bill.money":e.detail
    })
  },
  //封装的函数
  createBills(data){
    let mutation=createBill
    mutations({data,mutation}).then((item)=>{
      console.log(item)
      wx.showToast({
        title: '新建账单成功',
        icon: 'success',
        duration: 1000
      })
    })
  },
  


})
