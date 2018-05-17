Vue.component('app-aside',{
    props:['logoutVisible'],
    template:`
        <aside>
        <div class="upper">
            <ul class="actions">
                <li><button class="button" @click="$emit('clickSave')">保存</button></li>
                <li><button class="button" @click="$emit('share')">分享</button></li>
                <li><button class="button" @click="$emit('print')">打印</button></li>
                <li><button class="button" @click="$emit('changeTheme')">换肤</button></li>
            </ul>
        </div>
        <div class="down">
            <button class="button" v-show="logoutVisible" @click="$emit('logout')">登出</button>
        </div>
    </aside>
    `,
})