<template lang="pug">
  transition(name="loading-show")
    .loading-content.column.main-center(v-show="loading")
      .loading-box.row.main-center
        spinner
</template>

<script>
import Spinner from '../Spinner/Spinner'
export default {
  props: {
    loading: {
      default: false
    }
  },
  components: {
    Spinner
  }
}
</script>
<style lang="scss">
.loading-show-enter-active, .loading-show-leave {
  transform: translateY(0);
  transition: all .2s 0s;
}
.loading-show-enter, .loading-show-leave-active {
  transform: translateY(-20px);
  opacity: 0;
  transition: all .2s 0s;
}
.loading-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.loading-box{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: inset 0 0 30px #fff, 0 1px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
