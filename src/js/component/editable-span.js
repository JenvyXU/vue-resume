require('css/editable-span.less')
let EditableSpan=Vue.component('editable-span', {
    props: ['value', 'editing'],
    template: `
      <span class="editableSpan">
        <span v-show="!editing">{{value}}</span>
        <input v-show="editing" type="text" v-bind:value="value" @input="triggerEdit">
      </span>
    `,
    data(){
        return {
        }
    },
    methods: {
        triggerEdit(e){
            this.$emit('edit', e.target.value)
            console.log(e.target.value)
        }
    }
})
module.exports=EditableSpan