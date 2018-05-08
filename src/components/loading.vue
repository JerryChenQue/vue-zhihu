<template>
	<div class="loading-box" v-show="loading">
      	<div class="icon-loading"></div>
      	<p class="loading-title">加载中...</p>
    </div>
</template>
<script>
	import { mapState,mapMutations } from 'vuex';
	export default {
	  	name: 'loading',
	  	data () {
			return{
				
			}
		},
		computed : {
	      	...mapState([
	          	'loading'
	      	])
	  	}
	}
</script>