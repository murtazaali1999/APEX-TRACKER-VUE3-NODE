<template>
  <div class="search">
    <h1>Tracker Player Stats</h1>
    <form @submit.prevent="onSubmit">
      <label for="platform">Platform</label>
      <select name="platform" id="platform" v-model="platform">
        <option value="psn">Playstation</option>
        <option value="xbl">XBOX</option>
        <option value="origin">Origin</option>
      </select>

      <div class="form-group">
        <label for="gamertag">GamerTag</label>
        <input
          type="text"
          name="gamertag"
          v-model="gamertag"
          id="gamertag"
          placeholder="Origin-ID / XBOX-ID / PLAYSTATION-ID"
        />
      </div>
      <div class="form-group">
        <input type="submit" value="Submit" class="btn" />
      </div>
    </form>
  </div>
</template>

<!-- 
  warning
  error
  show
  info
  success
 -->
<script>
import { createToaster } from "@meforma/vue-toaster";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const gamertag = ref("");
    const platform = ref("");

    const onSubmit = () => {
      if (!gamertag.value) {
        createToaster({}).info("Enter GamerTag");
      } else {
        console.log(platform.value, gamertag.value);
        router.push(`/profile/${platform.value}/${gamertag.value}`);
      }
    };

    return {
      gamertag,
      platform,
      onSubmit,
    };
  },
  components: {},
  created() {},
};
</script>

<style lang="scss"></style>
