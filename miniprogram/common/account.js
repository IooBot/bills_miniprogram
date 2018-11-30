
let createAccount=`mutation createaccount($id: ID!, $user_id: ID, $accountName: String, $createdAt: String, $updateAt: String) {
        createaccount: create_account(id: $id user_id: $user_id accountName: $accountName createdAt: $createdAt updateAt: $updateAt) {
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
            accountName
            createdAt
            updateAt
        }
    }`,
    deleteAccount=`mutation deleteaccount($id: ID, $user_id: ID, $accountName: String, $createdAt: String, $updateAt: String) {
        deleteaccount: delete_account(id: $id user_id: $user_id accountName: $accountName createdAt: $createdAt updateAt: $updateAt)
    }`,
    getAccount=`query accountbyprops($user_id: ID, $accountName: String, $createdAt: String, $updateAt: String) {
        accountbyprops: account_by_props(user_id: $user_id accountName: $accountName createdAt: $createdAt updateAt: $updateAt) {
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
            accountName
            createdAt
            updateAt
        }
    }`,
    getAccountById=`query accountbyid($id: ID) {
        accountbyid: account_by_id(id: $id) {
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
            accountName
            createdAt
            updateAt
        }
    }`

export default{
    createAccount,
    deleteAccount,
    getAccount,
    getAccountById
}

/*
{
    "id": "sadasdad",
    "accountName": "String",
    "createdAt": "String",
    "updateAt": "String",
    "user_id": "addad"
}
*/