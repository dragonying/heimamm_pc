<template>
   <quill-editor :content="value"
                :options="editorOption"
                @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'quillEditor',
  props: ['value'],
  data () {
    return {
        editorOption: {
          // some quill options
        }
      }
  },
   components: {
    'quill-editor':quillEditor
  },
    methods: {
      onEditorChange({html}) {
        this.$emit('input',html);//传递给父组件
      }
    },
}
</script>

<style></style>
