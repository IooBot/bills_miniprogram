let createCollect=`mutation createcollect($updateAt: String, $remark: String, $account_id: ID, $month: String, $createdAt: String, $allIncome: Float, $allPay: Float, $year: String, $id: ID!, $user_id: ID) {
        createcollect: create_collect(updateAt: $updateAt remark: $remark account_id: $account_id month: $month createdAt: $createdAt allIncome: $allIncome allPay: $allPay year: $year id: $id user_id: $user_id) {
            updateAt
            remark
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            month
            createdAt
            allIncome
            allPay
            year
            id
            user_id {
                id
                openid
                username
                password
                avatar
                createdAt
                updateAt
            }
        }
    }`,
    deleteCollect=`mutation deletecollect($updateAt: String, $remark: String, $account_id: ID, $month: String, $createdAt: String, $allIncome: Float, $allPay: Float, $year: String, $id: ID, $user_id: ID) {
        deletecollect: delete_collect(updateAt: $updateAt remark: $remark account_id: $account_id month: $month createdAt: $createdAt allIncome: $allIncome allPay: $allPay year: $year id: $id user_id: $user_id)
    }`,
    updateCollect=`mutation updatecollect($updateAt: String, $remark: String, $account_id: ID, $month: String, $createdAt: String, $allIncome: Float, $allPay: Float, $year: String, $id: ID, $user_id: ID) {
        updatecollect: update_collect(updateAt: $updateAt remark: $remark account_id: $account_id month: $month createdAt: $createdAt allIncome: $allIncome allPay: $allPay year: $year id: $id user_id: $user_id) {
            updateAt
            remark
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            month
            createdAt
            allIncome
            allPay
            year
            id
            user_id {
                id
                openid
                username
                password
                avatar
                createdAt
                updateAt
            }
        }
    }`,
    getCollect=`query collectbyprops($updateAt: String, $remark: String, $account_id: ID, $month: String, $createdAt: String, $allIncome: Float, $allPay: Float, $year: String, $user_id: ID) {
        collectbyprops: collect_by_props(updateAt: $updateAt remark: $remark account_id: $account_id month: $month createdAt: $createdAt allIncome: $allIncome allPay: $allPay year: $year user_id: $user_id) {
            updateAt
            remark
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            month
            createdAt
            allIncome
            allPay
            year
            id
            user_id {
                id
                openid
                username
                password
                avatar
                createdAt
                updateAt
            }
        }
    }`


export default {
    createCollect,
    deleteCollect,
    updateCollect,
    getCollect
}


/*
createCollect
{
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
 */