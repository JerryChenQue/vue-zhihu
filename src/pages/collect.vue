<template>
	<div class="collect">
		<div class="collect-container">
			<div class="collect-title">我的收藏</div>
			<ul class="article-container">
			    <article-list v-for="(data, index) in themeData" v-bind:item="data" v-bind:key="data.id"></article-list>
		  	</ul>
		</div>
		<app-loading></app-loading>
	</div>
</template>
<script>
	import articleList from '../components/articleList';
	import utils from '../js/util';
	import { mapState,mapMutations } from 'vuex';
	import AppLoading from '@/components/loading'
	export default {
		data () {
		    return {
		      themeData:{},
		      scrolled:false
		    }
	  	},
	  	components: {
		    AppLoading,
		    articleList
	  	},
	  	mounted () {
	    	this.changeGetBack(true)
	    	$('.theme-container').on('scroll', this.handleScroll);
	    	if (utils.getStore('collectList')) {
		        this.themeData = JSON.parse(utils.getStore('collectList'));
		    }
	  	},
	  	methods: {
	  		...mapMutations([
        		'changeLoadingShow',
        		'changeGetBack'
    		]),
    		handleScroll () {
		      let totalheight = parseFloat($('.theme-container').height()) + parseFloat($('.theme-container').scrollTop());
		      if ($('.theme-container').get(0).scrollHeight <= totalheight) {
		        this.scrolled = true
		      }
		    },
	  	},
	}
</script>
<style scoped>
.collect{
  position: fixed;
  height: 100%;
  width: 100%;
}
.collect-container{
  position: relative;
  overflow-y: scroll;
  height: 100%;
}
.collect-title{
	background-color: #eee;
	height: .8rem;
	line-height: .8rem;
	margin-top: .8rem;
}
.article-container{
  padding: 0 .15rem;
  margin-bottom: .3rem;
}
</style>