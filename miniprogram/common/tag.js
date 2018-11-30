let createTag=`mutation createtag($id: ID!, $account_id: ID, $name: String, $icon: String, $createdAt: String, $updateAt: String) {
        createtag: create_tag(id: $id account_id: $account_id name: $name icon: $icon createdAt: $createdAt updateAt: $updateAt) {
            id
            account_id {
                id
                accountName
                createdAt
                updateAt
            }
            name
            icon
            createdAt
            updateAt
        }
    }`,
    deleteTag=`mutation deletetag($id: ID, $account_id: ID, $name: String, $icon: String, $createdAt: String, $updateAt: String) {
        deletetag: delete_tag(id: $id account_id: $account_id name: $name icon: $icon createdAt: $createdAt updateAt: $updateAt)
    }`,
    updateTag=`mutation updatetag($id: ID, $account_id: ID, $name: String, $icon: String, $createdAt: String, $updateAt: String) {
        updatetag: update_tag(id: $id account_id: $account_id name: $name icon: $icon createdAt: $createdAt updateAt: $updateAt) {
            id
            account_id {
                id
    
                accountName
                createdAt
                updateAt
            }
            name
            icon
            createdAt
            updateAt
        }
    }`,
    getTag=`query tagbyid($id: ID) {
        tagbyid: tag_by_id(id: $id) {
            id
            account_id {
                id
    
                accountName
                createdAt
                updateAt
            }
            name
            icon
            createdAt
            updateAt
        }
    }`


export default {
    createTag,
    deleteTag,
    updateTag,
    getTag
}