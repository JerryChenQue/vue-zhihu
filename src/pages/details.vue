<template>
	<div class="details">
		<div class="details-container">
			<div v-if="data.images && data.images != ''" class="details-img-box">
				<div class="swiper-container">
	              	<img class="item-image" v-bind:src="data.images">
	              	<div class="item-mask"></div>
	              	<div class="item-title">
	              		<p>{{data.title}}</p>
	              		<p class="image-source">{{data.image_source}}</p>
	              	</div>
		      	</div>
			</div>
			<div class="details-title" v-else>{{data.title}}</div>
			<div class="details-content" v-for="item in data.body">
				<div class="details-content-head">
					<h3 class="content-title" v-if="item.title && item.title != ''">{{item.title}}</h3>
					<div v-if="(item.avatar && item.avatar != '') || (item.author && item.author != '') || (item.bio && item.bio != '')" class="details-content-author">
						<img v-if="item.avatar && item.avatar != ''" class="author-img" :src="item.avatar">
						<p v-if="item.author && item.author != ''" class="author-name">{{item.author}}</p>
						<p v-if="item.bio && item.bio != ''" class="author-explain">{{item.bio}}</p>
					</div>
				</div>
				<div class="details-content-text" v-for="it in item.content">
		            <p v-if="it.type == 'p'">{{it.value}}</p>
		            <img v-else-if="it.type == 'img'" :src="it.value">
		            <p v-else-if="it.type == 'pstrong'" class="strong">{{it.value}}</p>
		            <p v-else-if="it.type == 'pem'" class="em">{{it.value}}</p>
		            <p v-else-if="it.type == 'blockquote'" class="qoute">{{it.value}}</p>
		            <p v-else>{{it.value}}</p>
				</div>
			</div>
		</div>
		<div class="details-btm">
			<p><span class="icon-share"></span></p>
			<p @click="refreshWeb"><span class="icon-refresh"></span></p>
			<p @click="collectActive"><span :class="{'icon-collect-active' : collect}" class="icon-collect"></span></p>
			<p @click="getComment"><span class="icon-comment"></span></p>
			<p @click="likeActive"><span :class="{'icon-like-active' : like}" class="icon-like"></span></p>
		</div>
		<app-loading></app-loading>
	</div>
</template>
<script>
	import api from '../js/api';
	import utils from '../js/util';
	import { mapState,mapMutations } from 'vuex';
	import AppLoading from '@/components/loading'

	export default {
		name: 'details-top',
		data () {
			return{
				data:{},
				collect:false,
				like:false,
				collectList:[]
			}
		},
	    mounted () {
	    	this.getNewDetails()
	    	this.changeGetBack(true)
		    if (utils.getStore('collectList')) {
		        this.collectList = JSON.parse(utils.getStore('collectList'));
		        for (var i = 0; i < this.collectList.length; i++) {
		        	if(parseInt(this.collectList[i].id) == parseInt(this.$route.query.id)){
  						this.collect = this.collectList[i].collect === 'false' ? false : true
  					}
		        }
		    }
	  	},
	  	methods: {
	  		...mapMutations([
        		'changeLoadingShow',
        		'changeGetBack'
    		]),
	  		getNewDetails () {
  				this.changeLoadingShow(true);
	  			api.getNewsDetail(this.$route.query.id).then(res => {
	  				this.changeLoadingShow(false);
	  				res.body = utils.parseStory(res.body)
		          	this.data = res;
	      		});
	  		},
	  		refreshWeb () {
	  			window.location.reload();
	  		},
	  		collectActive () {
	  			this.collect = !this.collect
	  			if(this.collect){
	  				this.collectList.push({id:this.data.id,title:this.data.title,images:this.data.images,collect:this.collect})
	  			}else{
	  				for (var i = 0; i < this.collectList.length; i++) {
	  					if(parseInt(this.collectList[i].id) == parseInt(this.data.id)){
	  						this.collectList.splice(this.collectList.indexOf(this.collectList[i]),1)
	  					}
	  				}
	  			}
	  			utils.setStore('collectList', this.collectList);
	  		},
	  		likeActive () {
	  			this.like = !this.like
	  		},
	  		getComment () {
	  			this.$router.push({ path: '/comment', query: { id: this.$route.query.id }})
	  		}
	  	},
	  	components: {
		    AppLoading
	  	}
	}
</script>
<style scoped>
	.details{
		position: fixed;
  		height: 100%;
  		width: 100%;
	}
	.details-container{
		position: relative;
  		overflow-y: scroll;
  		height: 100%;
  		bottom:1rem;
	}
	.details-img-box{
		height: 5rem;
		width: 100%;
		background: #ccc;
		margin-top: 1.8rem;
	}
	.details-title{
		width: 100%;
		background: #eee;
		padding: .2rem .4rem;
	  	text-align: left;
	  	font-size: .3rem;
	  	margin-top: 1.8rem;
	  	font-weight: bold;
	}
	.details-content{
		padding: .4rem;
		text-align: left;
	}
	.content-title{
		font-size: .4rem;
		font-weight: bold;
		margin-bottom: .2rem;
	}
	.details-content-author{
		margin-bottom: .2rem;
		overflow: hidden;
	}
	.author-img{
		width: .6rem;
		height: .6rem;
		float: left;
	}
	.author-name{
		float: left;
		font-size: .35rem;
		padding-left: .2rem;
		height: .6rem;
		line-height: .6rem;
		display: inline-block;
	}
	.author-explain{
		font-size: .2rem;
		clear: both;
		text-align: left;
		display: inline-block;
		line-height: .6rem;
	}
	.swiper-container {
	  	position: relative;
	  	height: 5rem;
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
	  	box-sizing: border-box;
	  	padding: .1rem .2rem;
	  	text-align: left;
	  	font-size: .38rem;
	  	min-height: 1.2rem
	}
	.image-source{
		text-align: right;
		font-size: .3rem
	}
	.details-content-text{
		margin-bottom: .2rem;
	}
	.details-content-text p{
		font-size: .2rem;
	}
	.details-content-text .strong{
		font-weight: bold;
	}
	.details-content-text .em{
		font-style:italic;
	}
	.details-content-text img{
		width: 100%;
	}
	.details-content-text .qoute{
		border-left: 2px solid #CDE3F1;
    	padding-left: .2rem;
	}
	.details-btm{
		position: fixed;
		bottom:0;
		left:0;
		height: 1rem;
		width: 100%;
		border-top: 2px solid #ddd;
		background: #fff;
	}
	.details-btm p{
		width: 20%;
		float: left;
		height: 1rem;
	}
	.details-btm span{
		display: inline-block;
		width: .6rem;
		height: .6rem;
		margin-top: .2rem;
	}
	.icon-share{
		background: url("../images/share.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-refresh{
		background: url("../images/refresh.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-collect{
		background: url("../images/star.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-collect-active{
		background: url("../images/star_yellow.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-comment{
		background: url("../images/insert_comment.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-like{
		background: url("../images/thumb_up.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.icon-like-active{
		background: url("../images/thumb_up_active.png") no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
</style>
