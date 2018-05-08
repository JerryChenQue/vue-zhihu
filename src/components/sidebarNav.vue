<template>
  <div class="sidebar">
    <div class="sidebar-user">
      <p class="sidebar-user-info">
        <span class="user-img"></span>
        <span class="user-name">未登录</span>
      </p>
      <router-link :to="{ name: 'collect'}">
        <p class="my-collect">
          <span class="collect-img"></span>
          <span class="collect-info">我的收藏</span>
        </p>
      </router-link>
    </div>
    <div class="sidebar-btm">
      <ul class="sidebar-menu">
        <router-link :to="{ name: 'home'}">
          <li @click="getActive(0)" :class="[id==0?'menu-active':'']" class="menu-list menu-home"><span class="menu-home-img"></span>首页</li>
        </router-link>
        <router-link v-for="item in navData" v-bind:key="item.id" :to="{path:'/theme/'+item.id}">
          <li @click="getActive(item.id)" :class="[id==item.id?'menu-active':'']" class="menu-list" >{{item.name}}<span class="menu-list-img"></span></li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '../js/api';
import { mapState } from 'vuex';
import util from '../js/util'

export default {
  name: 'sidebar',
  data () {
    return {
      navData: {},
      id:0
    }
  },
  computed : {
      ...mapState([
          'sidebarShow'
      ])
  },
  watch :{
    sidebarShow :function(val,oldVal){
      if(val){
        $('.sidebar').stop().animate({left: '0'}, 500);
      }else{
        $('.sidebar').stop().animate({left: '-65%'}, 500);
      }
    }
  },
  mounted () {
    this.getMenu();
  },
  beforeUpdate(){
    if (util.getStore('index')) {
        this.id = util.getStore('index');
    }
  },
  methods: {
    getMenu () {
      api.getTheme()
        .then(res => {
          this.navData = res.others
      });
    },
    getActive (id=0) {
      this.id = id;
      util.setStore('index', id);
    }
  }
}
</script>

<style scoped>
.sidebar{
  position: fixed;
  top:.8rem;
  left:-65%;
  height: 100%;
  width: 65%;
  background: #fff;
  z-index: 99;
}
.sidebar-user{
  height: 2.8rem;
  width: 100%;
  background: #20B4F0;
}
.sidebar-user-info{
  height: 1.8rem;
  width: 100%;
}
.user-img{
  display: inline-block;
  background: #ccc;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  float: left;
  margin-top: .4rem;
  margin-left: .5rem;
}
.user-name{
  display: inline-block;
  float: left;
  line-height: 1.8rem;
  padding-left: .3rem;
  color:#fff;
}
.my-collect{
  height: 1rem;
  width: 100%;
  line-height: 1rem;
  color:#fff;
}
.collect-img{
  display: inline-block;
  width: .6rem;
  height: .6rem;
  background: url(../images/star_white.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;  
  float: left;
  margin-top: .2rem;
  margin-left: .5rem;
}
.collect-info{
  float: left;
  padding-left: .2rem;
}
.sidebar-btm{
  overflow:hidden;
  height:-moz-calc(100% - 1.8rem); 
  height:-webkit-calc(100% - 1.8rem); 
  height: calc(100% - 1.8rem);
}
.sidebar-menu{
  overflow: auto;
  height:-moz-calc(100% - 1.8rem); 
  height:-webkit-calc(100% - 1.8rem); 
  height: calc(100% - 1.8rem);
}
.sidebar-menu::-webkit-scrollbar {
    display: none;
}
.menu-list{
  height: 1rem;
  line-height: 1rem;
  width: 100%;
  text-align: left;
  font-size: .4rem;
  padding-left: .4rem;
}
.menu-home{
  color:#20B4F0;
}
.menu-active{
  background: #e9e9e9;
}
.menu-home-img{
  display: inline-block;
  width: .6rem;
  height: .6rem;
  background: url(../images/home.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
  margin-top: .2rem;
  float: left;
  margin-right: .2rem;
}
.menu-list-img{
  display: inline-block;
  width: .4rem;
  height: .4rem;
  background: url(../images/plus.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
  margin-top: .3rem;
  float: right;
  margin-right: .2rem;
}
</style>