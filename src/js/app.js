window.App={
    props:['resume','logout-visible','current-user','url','display-resume','email'],
    template:`
    <div>        
         <top-bar v-show="mode==='edit'" @save="onClickSave" @share="onShare" :logout-visible="logoutVisible"
         @print="printResume" @changeTheme="skinPickerVisible=true" @logout="onLogout" @edit="editing=!editing"  :username="email"
         ></top-bar>
         <main>
            <resume :editing="editing" :mode="mode" :display-resume="displayResume" :resume="resume"></resume>
        </main>   
        <share :share-link="url"  v-show="shareVisible" @close="shareVisible=false"></share>
         <skin-picker v-show="skinPickerVisible" @close="skinPickerVisible=false"></skin-picker>
<!--        <skin-picker v-show="skinPickerVisible" @close="skinPickerVisible=false"></skin-picker>-->
    </div>
    `,
    data(){
        return {
            editing:false,
            shareLink:'',
            shareVisible:false,
            editingName: false,
            skinPickerVisible:false,
            previewUser: {
                objectId: undefined,
            },
            previewResume: {},
/*            currentUser: {
                objectId: undefined,
                email: '',
            },*/
/*            resume: {
                name: 'xzw',
                gender: 'boy',
                birthday: '1999年1月',
                jobTitle: '工程师',
                phone: '1388888888',
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
            },*/
            mode: 'edit',
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
        hasLogin () {
            console.log('userId')
            console.log(this.currentUser.objectId)
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
                this.$router.push('/login')
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
        printResume(){
            window.print()
        }

    },
}
Vue.component('app',App)

