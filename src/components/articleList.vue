<template>
	<router-link :to="{path:'/details',query: {id: item.id}}">
		<li class="article-box">
			<div v-show="item.images" class="article-img-box">
				<img class="article-img" v-bind:src="item.images">
			</div>
			<div class="article-title-box">
				<p class="article-title">{{item.title}}</p>
			</div>
		</li>
	</router-link>
</template>
<script>
	export default {
		name: 'articleList',
		props : {
	        item : {
	            required : true,
	            type : Object
	        }
	    },
	}
</script>
<style scoped>
.article-box{
	width: 100%;
	height: 2rem;
	margin-top: .28rem;
	border-radius: .05rem;
	border:1px solid #ccc;
	box-shadow: 0px 2px 5px #888888;
}
.article-img-box{
	height: 1.6rem;
	width: 1.6rem;
	margin:.2rem 0 .2rem .2rem;
	float: left;
}
.article-img{
	width: 100%;
	height: 100%;
}
.article-title-box{
	float: left;
	margin-top: .2rem;
	margin-left: .3rem;
	width: calc(100% - 1.6rem - 0.2rem - 0.3rem);
	width: -moz-calc(100% - 1.6rem - 0.2rem - 0.3rem);
  	width: -webkit-calc(100% - 1.6rem - 0.2rem - 0.3rem);
}
.article-title{
	text-align: left;
	font-size: .35rem;
}
</style>