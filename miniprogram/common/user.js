let createUser=`mutation createuser($id: ID!, $openid: String, $username: String, $password: String, $avatar: String, $createdAt: String, $updateAt: String) {
        createuser: create_user(id: $id openid: $openid username: $username password: $password avatar: $avatar createdAt: $createdAt updateAt: $updateAt) {
            id
            openid
            username
            password     
            avatar
            createdAt
            updateAt
        }
    }`,
    updateser=`mutation updateuser($id: ID, $openid: String, $username: String, $password: String, $avatar: String, $createdAt: String, $updateAt: String) {
        updateuser: update_user(id: $id openid: $openid username: $username password: $password avatar: $avatar createdAt: $createdAt updateAt: $updateAt) {
            id
            openid
            username
            password
            avatar
            createdAt
            updateAt
        }
    }`,
    deleteUser=`mutation deleteuser($id: ID, $openid: String, $username: String, $password: String, $avatar: String, $createdAt: String, $updateAt: String) {
        deleteuser: delete_user(id: $id openid: $openid username: $username password: $password avatar: $avatar createdAt: $createdAt updateAt: $updateAt)
    }`,
    getUser=`query userbyprops($openid: String, $username: String, $password: String, $avatar: String, $createdAt: String, $updateAt: String) {
        userbyprops: user_by_props(openid: $openid username: $username password: $password avatar: $avatar createdAt: $createdAt updateAt: $updateAt) {
            id
            openid
            username
            password
            avatar
            createdAt
            updateAt
        }
    }`




export default{
    createUser,
    updateser,
    deleteUser,
    getUser
}

/*
{
    "avatar": "String",
    "createdAt": "2018-11-11",
    "id": "adadad",
    "openid": "String",
    "password": "String",
    "updateAt": "String",
    "username": "String"
}


*/