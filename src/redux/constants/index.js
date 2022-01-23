const INIT_STATE = {
    registerUser:{
        isLoading: false,
        message: '',
        
    },
    loginUser:{
        token: undefined,
        isVerify: false,
        isLoading: false,
        user: {},
        isError: false,
        message: '',
    },
    createPost:{
        isLoading: false,
        isError: false,
    },
    editPost:{
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: {author: {}, post: {}}
    },
    getPost:{
        data: {
            author: {},
            post: {content: {}},
            comment: [],
        },
        isLoading: false,
        isLoaded: false,
        isError: false,
    },
    getPersonalPosts:{
        posts: [],
        followers: [],
        following: [],
        isLoading: false,
        isLoaded: false,
        isError: false,
    },
    getPosts:{
        data: [],
        isLoading: false,
        isLoaded: false, 
        isError: false,
    },
    profile:{
        isLoading: false,
        isError: false,
        isLoaded: false,
        author: {},
        posts: [],
    },
    getNotification:{
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
        totalUnread: 0,
    }

}

const typeUpdateReaction = {
    post: 'post',//for postDetail
    posts: 'posts',//for homePage
    personalPosts: 'personalPosts',//for userPage
    notificationPosts: 'notificationPost'//for in notification page
}

const typeUpdateFollow = {
    post: 'follow post',
    profile: 'follow profile'
}

const typeUpdateComment = {
    post: 'comment post',
    notification: 'comment notification'
}

const typeNotification = {
    heartPost: "notification heart my post",
    newPost: "notification new post",
    commentPost: "notification comment" 
}

const typeEmit = {
    heartPost: "emit notification heart my post",
    commentPost: "emit notification comment post",
    newPost: "emit notification has new post"
}

export {typeUpdateReaction, typeUpdateFollow, typeNotification, typeUpdateComment, typeEmit}


export default INIT_STATE;