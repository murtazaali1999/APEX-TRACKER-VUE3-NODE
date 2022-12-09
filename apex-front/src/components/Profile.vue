<template>
  <div class="profile-wrapper">
    <div v-if="loading"><h3>Loadng...</h3></div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-if="profileData" class="container">
      <h1 class="gamertag">
        <img
          :src="profileData.data.platformInfo.avatarUrl"
          alt=""
          class="platform-avatar"
        />
        {{ profileData.data.platformInfo.platformUserId }}
      </h1>
      <div class="grid">
        <div>
          <img :src="profileData.data.segments[1].metadata.imageUrl" alt="" />
        </div>
        <div>
          <ul>
            <li>
              <h4>Selected legend</h4>
              <p>{{ profileData.data.metadata.activeLegendName }}</p>
            </li>
            <li v-if="profileData.data.segments[0].stats.season2Wins">
              <h4>Season-2 Wins</h4>
              <p>
                {{
                  profileData.data.segments[0].stats.season2Wins.displayValue
                }}
                <span>
                  {{
                    profileData.data.segments[0].stats.season2Wins.percentile
                  }}%</span
                >
              </p>
            </li>
            <li>
              <h4>Kills</h4>
              <p>
                {{ profileData.data.segments[0].stats.kills.displayValue }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/">Go-Back</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const loading = ref();
    const error = ref(null);
    const profileData = ref({});

    const getProfileData = async (params) => {
      loading.value = true;

      console.log("Loading-->", params);

      try {
        const res = await axios.get(
          `http://localhost:4504/api/v1/profile/${params.platform}/${params.gamertag}`
        );

        console.log("Reponse--<>", res);

        profileData.value = res.data.data;
        console.log("Profile-->", profileData.value);
        loading.value = false;
      } catch (error) {
        loading.value = false;
        error.value = error.response.data.message;
        console.log(error);
      }
    };

    return {
      loading,
      error,
      profileData,
      getProfileData,
    };
  },
  components: {},
  async created() {
    await this.getProfileData(this.$route.params);
  },
  beforeCreate() {
    document.body.className = "body-bg-no-image";
  },
};
</script>

<style scoped>
.container {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 700px;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
}
h1.gamertag {
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}
a {
  display: inline-block;
  margin-top: 2rem;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a:hover {
  border: #ccc 2px solid;
  color: #ccc;
}
.platform-avatar {
  width: 40px;
  margin-right: 0.7rem;
}
img {
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
li {
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 10px;
}
li p {
  font-size: 2rem;
}
li:first-child p {
  font-size: 1.5rem;
}
li span {
  font-size: 1rem;
  color: #ccc;
}
@media (max-width: 500px) {
  h1 {
    font-size: 1.5rem;
    display: block;
    text-align: center;
  }
  .platform-avatar {
    display: none;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  li p {
    font-size: 1.5rem;
  }
}
</style>
