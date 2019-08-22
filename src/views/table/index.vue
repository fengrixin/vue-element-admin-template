<template>
  <div class="app-container">
    <tinymce v-model="content" :height="400"/>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'Table',
    components: {Tinymce},
    data() {
      return {
        content: '欢迎使用 Tinymce'
      }
    },
    methods: {}
  }
</script>
