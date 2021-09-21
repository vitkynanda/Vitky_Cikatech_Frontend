<template>
  <div class="card">
    <div class="card-wrapper">
      <div class="card-header">
        <h4>{{ author }}</h4>
        <div class="more">
          <img src="../assets/more.png" alt="more" @click="setToggle" />
        </div>
        <div class="delete" v-if="toggle">
          <p @click.prevent="() => deletePost(postId)">Delete</p>
        </div>
      </div>
      <p>{{ content }}</p>
    </div>
    <div class="card-footer">
      <p>{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post Card",
  props: {
    author: String,
    content: String,
    created_post: String,
    postId: String,
    getPost: Function,
  },
  data() {
    return {
      date: "",
      id: "",
      toggle: false,
    };
  },
  created() {
    const postDate = new Date(this.created_post);
    const day = postDate.getDate();
    const month = postDate.toLocaleString("en-US", { month: "short" });
    const year = postDate.getFullYear();
    const time = postDate.toLocaleTimeString();
    this.date = `${day} ${month} ${year}, ${time}`;
  },

  methods: {
    deletePost(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#04c35c",
          cancelButtonColor: "gray",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(
              `https://wong801-portfolio.herokuapp.com/api/post/delete/${id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
              .then((res) => res.json())
              .then((data) =>
                this.$swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Deleted",
                  text: data.msg.charAt(0).toUpperCase() + data.msg.slice(1),
                  showConfirmButton: false,
                  timer: 1500,
                })
              );
            this.getPost();
          } else {
            return;
          }
        });
    },
    setToggle() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  margin: 20px 0;
}

.more {
  padding: 5px 7px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}

.more:hover {
  background-color: #e5e5e5;
  opacity: 0.5;
}
.card-wrapper {
  padding: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #ffffff;
  color: #616161;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.delete {
  position: absolute;
  padding: 10px 5px;
  font-size: 13px;
  height: 100%;
  right: 0px;
  top: 25px;
  border-radius: 5px;
  background-color: #e5e5e5;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.895, 0.03, 0.685, 0.22);
  transform: translateY(10%);
}
.card-footer {
  padding: 20px 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ffffff;
  margin-top: 1.5px;
  color: #616161;
  font-size: 12px;
}

img {
  width: 15px;
  margin-top: 2px;
}

.card-wrapper > p {
  width: 95%;
  font-size: 12px;
}

h4 {
  color: #1a202c;
  margin-bottom: 15px;
}
</style>
