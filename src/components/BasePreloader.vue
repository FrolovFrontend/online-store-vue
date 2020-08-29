<template>
  <div class="base-preloader">
    <div class="loader" id="loader-6">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.base-preloader {
  display: flex;
  justify-content: center;
  width: 100%;
}

.loader {
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}

#loader-6 {
  top: 8px;
  left: -2.5px;
}

#loader-6 span {
  display: inline-block;
  width: 5px;
  height: 20px;
  background-color: #9eff00;
  margin-right: 2px;
}

#loader-6 span:nth-child(1) {
  animation: grow 1s ease-in-out infinite;
}

#loader-6 span:nth-child(2) {
  animation: grow 1s ease-in-out 0.15s infinite;
}

#loader-6 span:nth-child(3) {
  animation: grow 1s ease-in-out 0.3s infinite;
}

#loader-6 span:nth-child(4) {
  animation: grow 1s ease-in-out 0.45s infinite;
}

@keyframes grow {
  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(1.8);
  }
}
</style>