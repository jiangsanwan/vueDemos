<template>
	<router-view v-slot="{ Component }">
		<transition name="fade-transform" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'App',
		/**
		 * document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
    	alert('请尊重劳动成果！www.17sucai.com');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
    	alert('请尊重劳动成果！www.17sucai.com');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('请尊重劳动成果！www.17sucai.com');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
           alert('请尊重劳动成果！www.17sucai.com');
           return false;
    }
}
document.oncontextmenu=function(){
	alert('请尊重劳动成果！www.17sucai.com');
    return false;
}
		 */
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>