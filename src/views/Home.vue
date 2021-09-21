<template>
  <div class="home">
    <Navbar msg="Logo" />
    <div v-if="loading" class="loading"><p>Loading...</p></div>
    <div class="post-container" v-if="!loading">
      <h1>Update your activity</h1>
      <PostCreate :getPost="getPost" />
      <PostCard
        v-for="post in posts"
        :key="post._id"
        :author="post.author"
        :content="post.content"
        :created_post="post.created_at"
        :postId="post._id"
        :getPost="getPost"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import PostCreate from "../components/PostCreate";
import PostCard from "../components/PostCard";

export default {
  name: "Home",
  components: { Navbar, PostCreate, PostCard },
  data() {
    return {
      token: "",
      posts: [],
      loading: true,
    };
  },

  mounted() {
    if (this.$cookies.isKey("token")) {
      this.token = this.$cookies.get("token");
    } else {
      this.$router.push("/login");
      return;
    }
    this.getPost();
  },

  methods: {
    async getPost() {
      try {
        const res = await fetch(
          "https://wong801-portfolio.herokuapp.com/api/post/get",
          {
            method: "GET",
            headers: {
              Authorization: "Barear " + this.token,
            },
          }
        );
        const data = await res.json();
        this.posts = data.data.filter((post) => post.author === "testuser");
        this.loading = false;
      } catch (e) {
        alert(e);
      }
    },
    // endPoint getUser tidak bisa diakses
    // getUser() {
    //   fetch("https://wong801-portfolio.herokuapp.com/api/getUser", {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Barear " + localStorage.getItem("token"),
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
    // },
  },
};
</script>

<style scoped>
.post-container {
  width: 50%;
  margin: 5% auto;
}

.loading {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
}
h1 {
  margin-bottom: 20px;
}

@media only screen and (max-width: 768px) {
  .post-container {
    width: 85%;
    margin: 8% auto;
  }

  h1 {
    font-size: 23px;
  }
}
</style>
