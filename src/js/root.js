const routes = [
    { path: '/', component: window.App},
    { path: '/login', component: window.Login },
    { path: '/signUp', component: window.SignUp },
]
const router = new VueRouter({
    routes,
})
var app = new Vue({
    router,
    data:{
            shareVisible: false,
            loginVisible: false,
            logoutVisible: false,
            mode: 'edit',
            shareLink:'',
            resume: {
                name: '姓名',
                gender: '男',
                birthday: '1992年1月1日',
                location:'City,China',
                jobTitle: '前端工程师',
                phone: '13800000000',
                email: 'example@example.com',
                wechat:'xuzhenwei',
                qq:'1234567890',
                aboutme:`Hello! 我是一名前端开发工程师，熟练使用Html、CSS和JavaScript开发前端网页；熟悉常见的算法；熟练使用各种前端工具，比如vscode、webstrom、webpack等；熟悉MVC设计模式，可以快速的对项目代码进行模块化；熟悉Vue框架，如何你觉得我符合贵司的要求，请联系我。`,
                education:[
                    {year:'2011.9 - 2015.7',school:'输入你的大学',education:'本科',major:'软件工程'},
                    {year:'2015.9 - 2018.7',school:'输入你的大学',education:'硕士',major:'软件工程'},
                ],
                skills:[
                    {name:'Javascript',value:80},
                    {name:'CSS',value:50},
                    {name:'HTML',value:70},
                ],
                projects: [
                    {
                        name: '第一个项目',
                        link: 'http://www.example1.com',
                        keywords: 'keyword1/keyword2/keyword3',
                        description: `项目界面...，有...功能，可以...,
特点是：
1. 使用Vue框架；
2. 使用了jQuery库
3. ...
`
                    },
                    {
                        name: '第二个项目',
                        link: 'http://www.example1.com',
                        keywords: 'keyword1/keyword2/keyword3',
                        description: `项目界面...，有...功能，可以...,
特点是：
1. 使用Vue框架；
2. 使用了jQuery库
3. ...
`
                    },
                    {
                        name: '第三个项目',
                        link: 'http://www.example1.com',
                        keywords: 'keyword1/keyword2/keyword3',
                        description: `项目界面...，有...功能，可以...,
特点是：
1. 使用Vue框架；
2. 使用了jQuery库
3. ...
`
                    },

                ]
            },
            previewResume:{},
            currentUser: {
                            objectId: undefined,
                            email: '',
                            },
    },
    computed: {
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },


    watch: {
        'currentUser.objectId': function (newValue, oldValue) {
            if (newValue) {
                this.getResume(this.currentUser).then((resume) => {
                    if (resume) {
                        this.resume = resume
                    }

                })
            }
        },
        'resume.skills':function(newValue,oldValue){
            console.log(1)
            for(let i=0;i<app.resume.skills.length;i++){
                let processValue=String(app.resume.skills[i].value)
                console.log(processValue)
                $('.processBar>li').eq(i).find('#process').css('width',processValue+'%')
            }
        }
    },


    methods:{
        getResume(user){
            let query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
            }, (error) => {
                // 异常处理
            });
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.logoutVisible=true
            this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
        },
        onLogout(e){
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },
    },
}).$mount('#root')

let currentUser = AV.User.current()
if(currentUser){
    app.logoutVisible=true
    app.currentUser=currentUser
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId

    app.getResume(app.currentUser).then(resume=>{
        console.log('resume')
        console.log(resume)
        if(resume){
            app.resume = resume
        }
    })
}
console.log(app.resume)
// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId

if (matches) {
    userId = matches[1]
    app.mode = 'preview'

    app.getResume({objectId: userId}).then(resume => {
        app.previewResume = resume
    })
}