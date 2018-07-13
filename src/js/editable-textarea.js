Vue.component('editable-textarea', {
    props: ['value', 'editing'],
    template: `
      <span class="editableSpan">
        <span  class="description" v-show="!editing">{{value}}</span>
        <textarea v-show="editing" type="text" v-bind:value="value" @input="triggerEdit"></textarea>
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