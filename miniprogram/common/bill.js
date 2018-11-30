let createBill=`mutation createbill($id: ID!, $account_id: ID, $tag_id: ID, $money: Float, $class: String, $remark: String, $createdAt: String, $updateAt: String) {
        createbill: create_bill(id: $id account_id: $account_id tag_id: $tag_id money: $money class: $class remark: $remark createdAt: $createdAt updateAt: $updateAt) {
            id
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            tag_id {
                id
                name
                icon
                createdAt
                updateAt
            }
            money
            class
            remark
            createdAt
            updateAt
        }
    }`,
    updateBill=`mutation updatebill($id: ID, $account_id: ID, $tag_id: ID, $money: Float, $class: String, $remark: String, $createdAt: String, $updateAt: String) {
        updatebill: update_bill(id: $id account_id: $account_id tag_id: $tag_id money: $money class: $class remark: $remark createdAt: $createdAt updateAt: $updateAt) {
            id
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            tag_id {
                id
                name
                icon
                createdAt
                updateAt
            }
            money
            class
            remark
            createdAt
            updateAt
        }
    }`,
    deleteBill=`mutation deletebill($id: ID, $account_id: ID, $tag_id: ID, $money: Float, $class: String, $remark: String, $createdAt: String, $updateAt: String) {
        deletebill: delete_bill(id: $id account_id: $account_id tag_id: $tag_id money: $money class: $class remark: $remark createdAt: $createdAt updateAt: $updateAt)
    }`,
    getBill=`query billbyprops($account_id: ID, $tag_id: ID, $money: Float, $class: String, $remark: String, $createdAt: String, $updateAt: String) {
        billbyprops: bill_by_props(account_id: $account_id tag_id: $tag_id money: $money class: $class remark: $remark createdAt: $createdAt updateAt: $updateAt) {
            id
            account_id {
                id
    
                accountName
                createdAt
                updateAt
            }
            tag_id {
                id
    
                name
                icon
                createdAt
                updateAt
            }
            money
            class
            remark
            createdAt
            updateAt
        }
    }`
    
export default {
    createBill,
    updateBill,
    deleteBill,
    getBill
}

/* 
{
  "account_id": "ID",
  "class": "String",
  "createdAt": "String",
  "id": "adds",
  "money": 10,
  "remark": "String",
  "tag_id": "adadada",
  "updateAt": "String"
}

*/