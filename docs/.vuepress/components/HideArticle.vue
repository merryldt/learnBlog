<template>
  <div>
  </div>
</template>
<script>
 const btwPlugin = import('../public/js/btglunis')
  export default {
    name: 'HideArticle',
    data() {
      return {
      }
    },
    mounted() {
      btwPlugin().then(module => {
            Vue.use(module.default);
        })
      }
    }

</script>
<style lang="scss" scoped>
</style>
 
