<template lang="pug">
.spinner.row.main-center(:style="spinnerStyle")
  svg.circular(viewBox="0 0 60 60")
    circle.path(
      cx="30",
      cy="30",
      r="20",
      fill="none",
      stroke="rgb(14, 137, 237)"
    )
</template>

<script>
export default {
  name: 'spinner',

  props: {
    size: {
      type: Number,
      default: 30
    }
  },

  computed: {
    spinnerStyle () {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      }
    }
  }
}
</script>

<style lang="scss">
.circular {
  width: 100%;
  height: 100%;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 3;
  stroke-linecap: round;
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
