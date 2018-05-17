let app = new Vue({
    el: '#app',
    data: {
        shareLink:'',
        editingName: false,
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        skinPickerVisible:false,
        previewUser: {
            objectId: undefined,
        },
        previewResume: {},
        currentUser: {
            objectId: undefined,
            email: '',
        },
        resume: {
            name: '姓名',
            gender: '女',
            birthday: '1990年1月',
            jobTitle: '前端工程师',
            phone: '13800000000',
            email: 'example@example.com',
            skills: [
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
            ],
            projects: [
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
                {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请详细描述'},
            ]
        },
        mode: 'edit',
    },
    computed: {
        displayResume(){
            console.log('1111'+this.mode);
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    },
    watch: {
        'currentUser.objectId': function (newValue, oldValue) {
            if (newValue) {
                this.getResume(this.currentUser).then((resume)=>this.resume=resume)
            }
        }
    },
    methods: {
        onShare(){
            if(this.hasLogin()){
                this.shareVisible=true
            }else{
                alert('请先登录')
            }
        },
        onEdit(key, value){
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match, number) => `.${number}`)
            // key = skills.0.name
            keys = key.split('.')
            let result = this.resume
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    result[keys[i]] = value
                } else {
                    result = result[keys[i]]
                }
            }
        },
        hasLogin () {
            return !!this.currentUser.objectId
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.loginVisible = false
        },
        onLogout(e){
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.loginVisible = true
            } else {
                this.saveResume()
            }
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.resume)
            user.save().then(() => {
                alert('保存成功')
            }, () => {
                alert('保存失败')
            })
        },
        getResume(user){
            var query = new AV.Query('User');
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                console.log(resume);
                return resume
            }, (error) => {
                // 异常处理
            });
        },

    }
})


// 获取当前用户
let currentUser = AV.User.current()
console.log(1);
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then(resume=>{
        app.resume = resume
    })
}


// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
    userId = matches[1]
    app.mode = 'preview'
    console.log(app.mode);
    app.getResume({objectId: userId}).then(resume => {
        app.previewResume = resume
    })
}