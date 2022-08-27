<template>
  <div class="container">
    <div class="box">
      <img>
      <img>
      <img>
      <img>
      <img>
      <img>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.container {
  position: relative;
  perspective: 2000px;
}

.box {
  position: relative;
  width: 430px;
  height: 430px;
  transition: all 0.5s;
  transform-style: preserve-3d;
  margin-left: 50%;
  margin-top: 15%;
}

.box:hover {
  transform: rotateX(50deg) rotateZ(-50deg);
}

.box img {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 3px rgb(61, 138, 226);
  transition: all 1.5s;
  transform: translateZ(0px);
  background-image: url("image/Yi01.jpg");
  border-radius: 10px;
}
.box img:nth-child(1) {
  background-image: url("image/Yi01.jpg");
}

.box img:nth-child(2) {
  background-image: url("image/Yi02.jpg");
}

.box img:nth-child(3) {
  background-image: url("image/Yi03.jpg");
}

.box img:nth-child(4) {
  background-image: url("image/Yi04.jpg");
}

.box img:nth-child(5) {
  background-image: url("image/Yi05.jpg");
}
.box img:nth-child(6) {
  background-image: url("image/Yi01.jpg");
}

.box:hover img:nth-child(2) {
  transform: translateX(-10px) translateY(50px) translateZ(-30px);
  opacity: 0.9;
}

.box:hover img:nth-child(3) {
  transform: translateX(-20px) translateY(100px) translateZ(-60px);
  opacity: 0.8;
}

.box:hover img:nth-child(4) {
  transform: translateX(-30px) translateY(150px) translateZ(-90px);
  opacity: 0.7;
}

.box:hover img:nth-child(5) {
  transform: translateX(-40px) translateY(200px) translateZ(-120px);
  opacity: 0.6;
}

.box span {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 2s;
  opacity: 0.1;
}

.box:hover span {
  transform: translateX(-50px) translateY(50px) translateZ(-50px);
  box-shadow: 0 0 40px rgb(41, 151, 253);
  background-color: rgb(41, 151, 253);
}
</style>