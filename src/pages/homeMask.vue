<template>
	<div class="mask-app">
		<div class="mask-title">
			<p class="mask-img"></p>
			<p class="mask-content">Designed by Oopsguy</p>
		</div>
	</div>
</template>
<script>

export default {
  name: 'mask',
  mounted() {
  	let vm = this;
    setTimeout(function(){
      	$(".mask-app").animate({left: '-100%'}, 500,function(){
      		vm.$router.push({path : '/home'})
      	});
    },2000)
  }
}
</script>
<style>
	.mask-app{
	  position: fixed;
	  top:0;
	  left:0;
	  width: 100%;
	  height: 100%;
	  background: url(../images/bg.jpeg) no-repeat;
	  -webkit-background-size: 100% 100%;
	  background-size: 100% 100%;
	  z-index: 200;
	}
	.mask-title{
		background: rgba(255,255,255,.2);
		width: 100%;
		height: 2rem;
		position: absolute;
		bottom:2rem;
	}
	.mask-img{
		width: 2rem;
		height: 2rem;
		background: url(../images/logo.jpg) no-repeat;
	  	-webkit-background-size: 100% 100%;
	  	background-size: 100% 100%;
	  	margin-left: 1rem;
	  	float: left;
	}
	.mask-content{
		float: left;
		color:#f9f9f9;
		margin-top: 1.2rem;
		margin-left: .5rem;
		font-size: .35rem;
	}
</style>