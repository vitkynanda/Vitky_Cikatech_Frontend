<template>
  <div class="mynavbar">
    <div class="logo">
      <router-link to="/">{{ msg }}</router-link>
    </div>
    <div class="user-action">
      <div class="user-profile">
        <h3>Vitky</h3>
        <p>Web Developer</p>
      </div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.mynavbar {
  padding: 0 50px;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1a202c;
  position: sticky;
}

a {
  text-decoration: none;
  color: #1a202c;
  font-weight: 500;
  font-size: 20px;
}
.user-action {
  display: flex;
  align-items: center;
}

.user-profile {
  margin: 10px;
  font-size: 14px;
}

.user-profile > p {
  color: #616161;
  font-size: 12px;
  margin-top: 2px;
}

.logout-button {
  background-color: #e95750;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
  border: none;
}
@media only screen and (max-width: 768px) {
  .mynavbar {
    padding: 0 20px;
  }
}
</style>
