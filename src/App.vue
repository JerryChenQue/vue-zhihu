<template>
  <div id="app">
    <sidebar-nav></sidebar-nav>
    <app-head></app-head>
    <transition :name="transitionName">  
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>

<script>

import AppHead from '@/components/Head'
import sidebarNav from '@/components/sidebarNav'
import { mapActions } from 'vuex';


export default {
  name: 'app',
  data (){
    return {
      transitionName: 'slide-left' 
    }
  },
  components: {
    'app-head': AppHead,
    sidebarNav
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route" (to, from) {
      this.changeSidebarShow1(false)
      if(to.path == '/details'){  
        this.transitionName = 'slide-left';  
      }else if(from.path === '/details'){  
        this.transitionName = 'slide-right';  
      }
      if(to.path == '/comment'){  
        this.transitionName = 'slide-left';  
      }else if(from.path === '/comment'){  
        this.transitionName = 'slide-right';  
      }
    }
  },
  methods: {
    ...mapActions([
        'changeSidebarShow1'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: .3rem;
}
.router {  
    position: absolute;  
    width: 100%;  
    transition: all .8s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter,  
.slide-right-leave-active {  
    opacity: 0; 
    -webkit-transform: translate(100%, 0);  
    transform: translate(100%, 0);  
}  
  
.slide-left-leave-active,  
.slide-right-enter {  
    opacity: 0;
    -webkit-transform: translate(-100%, 0);  
    transform: translate(-100% 0);  
}  
.mask-app{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: #ccc;
  z-index: 200;
}
</style>
