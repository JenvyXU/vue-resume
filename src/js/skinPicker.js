Vue.component('skinPicker',{
    methods:{
        setTheme(name){
            //this.mainClass=name
            document.body.className=name
        }
    },
    template:`
    <div class="skinPiker">
        <button @click="setTheme('default')"></button>
        <button class="colorful" @click="setTheme('colors')"></button>
        <div class="toRight" @click="$emit('close')">    
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-right"></use>
            </svg>
        </div>
    </div>
    `,
})