 <template>
  <div class="theme">
    <div v-show="this.sidebarShow" @click="changeShow" class="right-mask"></div>
    <div class="theme-container">
      <div class="theme-top-img">
        <img class="item-image" v-bind:src="themeData.image">
        <div class="item-mask"></div>
        <div class="item-title">{{themeData.description}}</div>
      </div>
      <div class="editors-info">
          <span class="editors-title">主编</span>
          <div class="editors-name">
            <p v-for="item in themeData.editors" keys="item.id">
              <img :src="item.avatar">
              <span>{{item.name}}</span>
            </p>
          </div>
      </div>
      <ul class="article-container">
        <article-list v-for="(data, index) in themeData.stories" v-bind:item="data" v-bind:key="data.id"></article-list>
      </ul>
      <app-loading></app-loading>
    </div>
  </div>
</template>

<script>
import api from '../js/api';
import articleList from '../components/articleList';
import { mapState,mapActions,mapMutations } from 'vuex';
import AppLoading from '@/components/loading'

export default {
  data () {
    return {
      themeData:{},
      scrolled:false
    }
  },
  computed : {
      ...mapState([
          'sidebarShow',
      ])
  },
  watch: {
   '$route' (to, from) {
      this.getTheme();
    },
 },
  mounted () {
    this.getTheme();
    $('.theme-container').on('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions([
        'changeSidebarShow1'
    ]),
    ...mapMutations([
        'changeLoadingShow'
    ]),
    getTheme () {
      this.changeLoadingShow(true);
      api.getThemeStories(this.$route.params.id)
        .then(res => {
          this.changeLoadingShow(false);
          this.themeData = Object.assign(res)
          console.log(this.themeData)
      });
    },
    changeShow () {
      this.changeSidebarShow1(false)
    },
    handleScroll () {
      let totalheight = parseFloat($('.theme-container').height()) + parseFloat($('.theme-container').scrollTop());
      if ($('.theme-container').get(0).scrollHeight <= totalheight) {
        this.scrolled = true
      }
    },
  },
  components: {
    articleList,
    AppLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme{
  position: fixed;
  height: 100%;
  width: 100%;
}
.theme-container{
  position: relative;
  overflow-y: scroll;
  height: 100%;
}
.right-mask{
  position: fixed;
  top:0;
  left: 0;
  background: rgba(0,0,0,.5);
  width: 100%;
  height: 100%;
  z-index: 98;
}
.theme-top-img {
  position: relative;
  height: 4.8rem;
  overflow: hidden;
  margin-top: .8rem;
}
.item-image{
  height: 100%;
  width: 100%;
  display:inline-block;
  overflow:hidden;

}
.item-mask{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:rgba(0, 0, 0, .3);
  width: 100%;
  height: 100%;
}
.item-title{
  position: absolute;
  color:#fff;
  bottom:0;
  width: 100%;
  min-height: 1.2rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, .3);
  padding: .1rem .2rem;
  text-align: left;
  font-size: .38rem;      /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.editors-info{
  background-color: #efefef;
  min-height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  overflow: hidden;
  color: #999;
}
.editors-title{
  float: left;
  width: 1rem;
  text-align: center;
  vertical-align: top;
}
.editors-name{
  float: left;
  width: calc(100% - 1rem);
}
.editors-info p{
  display: inline-block;
  padding-right: .2rem;
}
.editors-info p img{
  vertical-align: middle;
}
.article-container{
  padding: 0 .15rem;
  margin-bottom: .3rem;
}
</style>
