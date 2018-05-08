<template>
	<div class="comment">
		<div class="comment-container">
			<div class="long-comment">
				<p @click="getLong()" class="comment-num">{{longNum}}条长评</p>
				<ul v-if="longLogin" class="comment-content">
					<li v-for="item in this.longData">
						<img class="avatar-box" :src="item.avatar" alt="avatar">
						<div class="comment-text">
							<h4>
								{{item.author}}
								<img src="../images/thumb_up.png">
							</h4>
							<p class="item-content">{{item.content}}</p>
							<p class="comment-time">{{getDateDesc(item.time)}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div>
				<p @click="getShort()" class="comment-num">{{shortNum}}条短评</p>
				<ul v-if="shortLogin" class="comment-content">
					<li v-for="item in this.storyData">
						<img class="avatar-box" :src="item.avatar" alt="avatar">
						<div class="comment-text">
							<h4>
								{{item.author}}
								<img src="../images/thumb_up.png">
							</h4>
							<p class="item-content">{{item.content}}</p>
							<p class="comment-time">{{getDateDesc(item.time)}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<app-loading></app-loading>
	</div>
</template>
<script>
import api from '../js/api';
import { mapState,mapMutations } from 'vuex';
import AppLoading from '@/components/loading'

export default {
  	name: 'comment',
  	data () {
		return{
			longData:{},
			storyData:{},
			longNum:0,
			shortNum:0,
			longLogin:true,
			shortLogin:true
		}
	},
    mounted () {
    	this.getLongComments()
    	this.getShortComments()
    	this.changeGetBack(true)
    	this.getExtraInfo()
  	},
  	methods: {
  		...mapMutations([
    		'changeLoadingShow',
    		'changeGetBack'
		]),
		getLong(){
			this.longLogin = !this.longLogin
		},
		getShort(){
			this.shortLogin = !this.shortLogin
		},
		getExtraInfo() {
			api.getStoryExtraInfo(this.$route.query.id).then(res => {
	          	this.longNum = res.long_comments
	          	this.shortNum = res.short_comments
      		});
		},
  		getLongComments () {
			this.changeLoadingShow(true);
  			api.getStoryLongComments(this.$route.query.id).then(res => {
  				this.changeLoadingShow(false);
	          	this.longData = res.comments;
      		});
  		},
  		getShortComments () {
			this.changeLoadingShow(true);
  			api.getStoryShortComments(this.$route.query.id).then(res => {
  				this.changeLoadingShow(false);
	          	this.storyData = res.comments;
      		});
  		},
  		getDateDesc(timstamp) {
		  var date = new Date(timstamp * 1000);
		  return (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes();
		}
  	},
  	components: {
	    AppLoading
  	}
}
</script>
<style>
	.comment{
		position: fixed;
  		height: 100%;
  		width: 100%;
	}
	.comment-container{
		position: relative;
  		overflow-y: scroll;
  		height: 100%;
	}
	.long-comment{
		padding-top: .8rem;
	}
	.comment-num{
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		padding-left: .5rem;
		border-bottom: 1px solid #ccc;
	}
	.comment-content .avatar-box{
		float: left;
		width: 20%;
		padding: .2rem;
	}
	.comment-content li {
		border-bottom: 1px solid #ccc;
		overflow: hidden;
		padding: .2rem 0;
	}
	.comment-content .comment-text{
		float: right;
		width: 80%;
		padding-right: .2rem;
	}
	.comment-text h4{
		text-align: left;
		height: .8rem;
		line-height: .8rem;
		font-size: .32rem;
		padding-top: .1rem;
	}
	.comment-text h4 img{
		width: .4rem;
		height: .4rem;
		float: right;
		margin-top: .2rem;
	}
	.comment-text .item-content{
		text-align: left;
		font-size: .3rem;
	}
	.comment-time{
		text-align: left;
		color:#999;
		margin-top: .2rem;
	}
</style>