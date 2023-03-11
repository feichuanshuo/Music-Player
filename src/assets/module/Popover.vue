<!--弹出框-->
<template>
  <div class="my-popover">
    <span @click="showMenu">
      <slot name="button"></slot>
    </span>
    <div v-show="showBox" class="my-popover-menu" ref="boxRef" @click="hideMenu">
      <slot name="box"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "yh-popover",
  data(){
    return {
      showBox: false
    };
  },
  props:['location','boxClass'],
  methods: {
    showMenu(){
      this.showBox = true;
      window.addEventListener('mousedown',this.hideMenu)
    },
    hideMenu(target){
      if(target.constructor.name==='MouseEvent'){
        if(!this.$refs.boxRef.contains(target.target)){
          this.showBox = false;
          window.removeEventListener('mousedown',this.hideMenu)
        }
      }
      else{
        this.showBox = false;
        window.removeEventListener('mousedown',this.hideMenu)
      }
    }
  },
  mounted() {
    let {boxRef} = this.$refs
    if(this.location==='top'){
      boxRef.className = 'my-popover-menu location-top' + ' ' + this.boxClass
    }
    else if(this.location==='bottom'){
      boxRef.className = 'my-popover-menu location-bottom'+ ' ' + this.boxClass
    }
    else{
      return
    }
  }
}
</script>

<style scoped>
  .my-popover {
    position: relative;
    display: inline-block;
  }

  .my-popover-menu {
    position: absolute;
    width: 120px;
    height: 60px;
    background: #303134;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    z-index: 100;
    font-size: 12px;
    padding: 5px 0;
    box-sizing: border-box;
  }

  .location-top {
    bottom: calc(100% + 5px);
  }

  .location-bottom {
    top: calc(100% + 5px);
  }
</style>
