
<template>
  <div id="app">
    <PomodoroClock />
  </div>
</template>

<script>

import PomodoroClock from './components/index';
// import Products from './components/products ';

export default {
  name: 'App',
  components: { PomodoroClock }
}
</script>

<style>

@import '../style.scss';


  body {
      margin: 0;
  }

  * {
      box-sizing: border-box;
      font-family:  "Times New Roman", Times, serif;
      font-style: italic;
  }

  #app {
    background-image: url("./pictures/back.jpeg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #000;
    position: absolute;
    width: 100%;
    padding-bottom: 70px;
  }

</style>
