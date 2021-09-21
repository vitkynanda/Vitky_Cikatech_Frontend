<template>
  <form class="post-form">
    <textarea
      placeholder="How about your feelings ?"
      rows="6"
      cols="82"
      v-model="post"
    />
    <div class="post-button">
      <button class="btn-cancel" @click.prevent="cancelPost">Cancel</button>
      <button type="button" class="btn-submit" @click.prevent="createPost">
        Post
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Post",
  props: {
    getPost: Function,
  },
  data() {
    return {
      post: "",
    };
  },
  methods: {
    createPost() {
      const details = {
        content: this.post,
      };
      let formBody = [];
      for (const property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log(formBody);
      fetch("https://wong801-portfolio.herokuapp.com/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Barear " + localStorage.getItem("token"),
        },
        body: formBody,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.success);
          if (data.success) {
            this.$swal.fire({
              icon: "success",
              title: "Post Created",
              text: data.msg.charAt(0).toUpperCase() + data.msg.slice(1),
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops..",
              confirmButtonColor: "#04c35c",
              text: data.msg.charAt(0).toUpperCase() + data.msg.slice(1),
            });
          }
        });
      this.post = "";
      this.getPost();
    },
    cancelPost() {
      this.post = "";
    },
  },
};
</script>

<style scoped>
.post-from {
  margin: 10px 0;
}
textarea {
  resize: none;
  padding: 30px;
  font-size: 14px;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border: none;
}
textarea:focus {
  outline: none;
}
.post-button {
  background-color: #ffffff;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -3px;
  display: flex;
  justify-content: flex-end;
}

.btn-cancel {
  color: #2d3748;
  font-size: 14px;
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #2d3748;
  margin-right: 5px;
  width: 80px;
  transition: all 0.1s ease-in-out;
}

.btn-submit {
  color: #ffffff;
  font-size: 14px;
  background-color: #04c35c;
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #04c35c;
  margin-right: 5px;
  width: 80px;
  transition: all 0.1s ease-in-out;
}

.btn-submit:hover,
.btn-cancel:hover {
  opacity: 0.8;
  transform: scale(1.02);
}
</style>
