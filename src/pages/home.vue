 <template>
  <div class="home">
    <div v-show="this.sidebarShow" @click="changeShow" class="right-mask"></div>
    <div class="home-container">
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in sliderData">
                <router-link :to="{path:'/details',query: {id: item.id}}">
                  <img class="item-image" v-bind:src="item.image">
                  <div class="item-mask"></div>
                  <div class="item-title">{{item.title}}</div>
                </router-link>
              </div>
          </div>
          <div class="pagination"></div>
      </div>
      <div class="headline">
        <p class="headline-title">今日热文</p>
        <p class="headline-time">{{date}}&nbsp;&nbsp;&nbsp;{{week}}</p>
      </div>
      <ul class="article-container">
        <article-list v-for="(data, index) in pageData" v-bind:item="data" v-bind:key="data.id"></article-list>
      </ul>
      <div class="last-article-container" v-for="item in lastData" v-bind:key="item.date">
        <p class="last-article-time">{{item.date}}&nbsp;&nbsp;&nbsp;{{item.lastWeek}}</p>
        <ul class="article-container">
          <article-list v-for="(data, index) in item.stories" v-bind:item="data" v-bind:key="data.id"></article-list>
        </ul>
      </div>
    </div>
    <app-loading></app-loading>
  </div>
</template>

<script>
import api from '../js/api';
import '../js/swiper';
import {formatDate,getWeek,getStrDate} from '../js/isDate';
import articleList from '../components/articleList';
import { mapState,mapActions,mapMutations } from 'vuex';
import AppLoading from '@/components/loading'

export default {
  data () {
    return {
      sliderData:{},
      pageData:{},
      date:"",
      lastData:[],
      newDate:new Date(),
      lastDate:"",
      getMonth:"",
      getDate:"",
      week:"",
      scrolled:false
    }
  },
  computed : {
      ...mapState([
          'sidebarShow',
      ])
  },
  mounted () {
    this.getNews();
    $('.home-container').on('scroll', this.handleScroll);
  },
  watch: {
    scrolled: function (val, oldVal) {
      console.log(val)
      if(val){
        this.getLastNews();
      }
    }
  },
  methods: {
    ...mapActions([
        'changeSidebarShow1'
    ]),
    ...mapMutations([
        'changeLoadingShow'
    ]),
    getNews () {
      this.changeLoadingShow(true);
      api.getLatestNews()
        .then(res => {
          this.changeLoadingShow(false);
          this.sliderData = res.top_stories
          this.pageData = res.stories
          this.date = formatDate(res.date)
          this.week = getWeek(this.date);
          // console.log(this.pageData)
          this.$nextTick( () => {
              let mySwiper = new Swiper('.swiper-container',{
                  loop:true,
                  grabCursor: true,
                  paginationClickable: true,
                  pagination: '.pagination',
                  autoplay: 5000
              });
          });
      });
    },
    getLastNews () {
      this.lastDate = getStrDate(this.newDate)
      api.getBeforeNews(this.lastDate)
        .then(res => {
          this.scrolled = false;
          this.newDate = new Date(this.newDate.getTime() - 24*60*60*1000);
          res.date = formatDate(res.date)
          res.lastWeek = getWeek(res.date);
          this.lastData.push(res);
      });
    },
    handleScroll () {
      let totalheight = parseFloat($('.home-container').height()) + parseFloat($('.home-container').scrollTop());
      if ($('.home-container').get(0).scrollHeight <= totalheight) {
        this.scrolled = true
      }
    },
    changeShow () {
      this.changeSidebarShow1(false)
    }
  },
  components: {
    articleList,
    AppLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../css/swiper.min.css';
.home{
  position: fixed;
  height: 100%;
  width: 100%;
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
.home-container{
  position: relative;
  overflow-y: scroll;
  height: 100%;
}
.swiper-container {
  position: relative;
  height: 4.8rem;
  overflow: hidden;
  margin-top: .8rem;
}
.item-image{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  margin-top: -1.2rem;
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
  background:rgba(0, 0, 0, .3);
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  padding: .1rem .2rem;
  text-align: left;
  font-size: .38rem;
  word-break:keep-all;           /* 不换行 */
  white-space:nowrap;          /* 不换行 */
  overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;         /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.headline{
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  color:#fff;
}
.headline-title{
  float: left;
  width: 1.8rem;
  background: #20B4F0;
}
.headline-time{
  float: left;
  padding: 0 .2rem;
  background: #019DD6;
}
.article-container{
  padding: 0 .15rem;
}
.last-article-time{
  height: .7rem;
  line-height: .7rem;
  padding-left: .2rem;
  background: #eee;
  margin-top: .28rem;
  text-align: left;
}
</style>
