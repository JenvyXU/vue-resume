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
            skinPickerVisible:false,
            loginVisible: false,
            logoutVisible: false,
            mode: 'edit',
            shareLink:'',

            resume: {
                name: '姓名',
                gender: '男',
                birthday: '1990年1月',
                location:'广州',
                jobTitle: '前端工程师',
                phone: '13800000000',
                email: 'example@example.com',
                wechat:'xuzhenwei111',
                qq:'1272117264',
                aboutme:`新京报快讯 21日，一网友爆料称，国航由北京飞往哈尔滨的CA1639航班起飞后，
                机舱内冒烟，随后返航。国航客服回复称，该航班于20时30分起飞后，发现客舱空调有异味，
                机组为确保安全，决定返回北京，随后国航已安排另一架飞机将旅客送往目的地。
                一位乘客家属提供的聊天记录显示，乘客称“当时机舱全是烟，有味道”，待飞机返航落地后，
                机组让乘客快速下机，“行李都不要拿”。国航客服一名工作人员称，经查询，
                显示7月21日CA1639航班于20时30分起飞后，发现客舱空调有异味，机组为确保安全，
                决定返回北京，21时已安全落地，随后国航已安排另一架飞机将旅客送往目的地。`,
                education:[
                    {year:'2011.9-2015.7',school:'大连海事大学',education:'本科',major:'通信工程'},
                    {year:'2011.9-2015.7',school:'大连海事大学',education:'本科',major:'通信工程'},
                ],
                skills:[
                    {name:'Javascript',value:80},
                    {name:'CSS',value:50},
                    {name:'HTML',value:70},
                ],
                projects: [
                    {name: '项目名称', link: 'http://www.baidu.com', keywords: 'CSS /JS /VUE',
                        description: `  新京报快讯 21日，一网友爆料称，国航由北京飞往哈尔滨的CA1639航班起飞后，机舱内冒烟，随后返航。国航客服回复称，该航班于20时30分起飞后，发现客舱空调有异味， 机组为确保安全，决定返回北京，随后国航已安排另一架飞机将旅客送往目的地。 一位乘客家属提供的聊天记录显示，乘客称“当时机舱全是烟，有味道”，待飞机返航落地后，机组让乘客快速下机，“行李都不要拿”。国航客服一名工作人员称，经查询，显示7月21日CA1639航班于20时30分起飞后，发现客舱空调有异味，机组为确保安全， 决定返回北京，21时已安全落地，随后国航已安排另一架飞机将旅客送往目的地。`},
                    {name: '项目名称', link: 'http://www.qq.com', keywords: '关键词', description: '项目描述'},
                    {name: '项目名称', link: 'http://www.baidu.com', keywords: '关键词',
                        description: `  新京报快讯 21日，一网友爆料称，国航由北京飞往哈尔滨的CA1639航班起飞后，机舱内冒烟，随后返航。国航客服回复称，该航班于20时30分起飞后，发现客舱空调有异味， 机组为确保安全，决定返回北京，随后国航已安排另一架飞机将旅客送往目的地。 一位乘客家属提供的聊天记录显示，乘客称“当时机舱全是烟，有味道”，待飞机返航落地后，机组让乘客快速下机，“行李都不要拿”。国航客服一名工作人员称，经查询，显示7月21日CA1639航班于20时30分起飞后，发现客舱空调有异味，机组为确保安全， 决定返回北京，21时已安全落地，随后国航已安排另一架飞机将旅客送往目的地。`},

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

/*for(let i=0;i<$('.processBar>li').length;i++){
 let processValue=$('.processBar>li').eq(i).find('.processValue>span')[0].innerText
    console.log(processValue)
    console.log($('.processBar>li').eq(i).find('#process'))
    $('.processBar>li').eq(i).find('#process').css('width',processValue+'%')
}*/
/*for(let i=0;i<app.resume.skills.length;i++){
    let processValue=String(app.resume.skills[i].value)
    console.log(processValue)
    $('.processBar>li').eq(i).find('#process').css('width',processValue+'%')
}*/
