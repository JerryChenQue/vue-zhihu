<template>
  <div class="head">
    <span v-if="back" @click='getBack' class="head-icon icon-back"></span>
    <span v-else @click='changeSidebar' class="head-icon icon-menu"></span>
    <div class="head-top">知乎日报</div>
  </div>
</template>
<script>
import { mapActions,mapState } from 'vuex';

export default {
  name: 'head-top',
  data () {
    return {
      show: true
    }
  },
  computed : {
      ...mapState([
          'sidebarShow',
          'back'
      ])
  },
  methods : {
    ...mapActions([
        'changeSidebarShow1',
        'changeGetBack1'
    ]),
    changeSidebar () {
      this.show = !this.sidebarShow
      if(this.show){
        this.changeSidebarShow1(true)
        this.show = false
      }else{
        this.changeSidebarShow1(false)
        this.show = true
      }
    },
    getBack () {
      this.changeGetBack1(false)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.head-top{
  position: fixed;
  top:0;
  left:0;
  height: .8rem;
  width: 100%;
  z-index: 100;
  line-height: .8rem;
  background: #20B4F0;
	color:#fff;
}
.head-icon{
  display: inline-block;
  width: .5rem;
  height: .5rem;
  position: fixed;
  top:.15rem;
  left:.2rem;
  z-index: 101;
}
.icon-menu{
  background: url(../images/menu.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
}
.icon-back{
  background: url(../images/back.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
}
</style>