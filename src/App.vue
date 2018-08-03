<style lang="css" scoped>

</style>

<template  >

<div class="app"   v-cloak>
     <keep-alive :include="/^keep-/">
      <router-view >
      </router-view> 
     </keep-alive>
</div>
</template>
<script>
import { mapState } from 'vuex';

import axios from 'axios'
    export default {
 
     beforeCreate(){
  
     },
    data(){
     return {
     
   
     }
    },
        watch: {

},
   methods:{

    },
    mounted(){
     
     
    },
    computed: mapState({
      
      }),
 }
</script>