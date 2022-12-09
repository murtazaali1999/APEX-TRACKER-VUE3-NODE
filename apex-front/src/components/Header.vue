<template>
  <div class="header-wrapper">
    <img src="../assets/apex.png" alt="APEX" />
  </div>
</template>

<script>
export default {
  setup() {
    const imageURI = () => {
      const URI = new URL("../assets/apex.png", import.meta.url).href;
      return URI;
    };

    return {
      imageURI,
    };
  },
  components: {},
  created() {},
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  width: 300px;
}
</style>
