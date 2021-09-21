<template>
  <div class="login-container">
    <div class="image-container"></div>
    <div class="login-wrapper">
      <div class="login">
        <p class="text-sm">Welcome back</p>
        <h2>Login to your account</h2>
        <form class="login-form" @submit.prevent="login">
          <label for="email">Email/Username</label>
          <input
            type="text"
            v-model.trim="v$.username.$model"
            :class="{
              'is-invalid': v$.username.$error,
              'is-valid': !v$.username.$invalid,
            }"
          />
          <span
            class="danger"
            v-if="validate && !v$.username.$error && v$.username.$invalid"
            >Username/Email required</span
          >
          <label for="password">Password</label>
          <input
            type="password"
            v-model.trim="v$.password.$model"
            :class="{
              'is-invalid': v$.password.$error,
              'is-valid': !v$.password.$invalid,
            }"
          />
          <span class="danger" v-if="v$.password.$error && v$.password.$invalid"
            >Password must be 8 character</span
          >
          <span
            class="danger"
            v-if="validate && !v$.password.$error && v$.password.$invalid"
            >Password required</span
          >
          <div class="login-option">
            <div class="remember-option">
              <input type="radio" id="remember" />
              <label for="remember">
                Remember me
              </label>
            </div>
            <div>
              <a href="">Forgot password ?</a>
            </div>
          </div>
          <button>Login now</button>
          <div class="register-option">
            <p>Don't have an account ?</p>
            <router-link to="/register">Register</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default {
  name: "Login",
  data() {
    return {
      v$: useVuelidate(),
      username: "",
      password: "",
      usernameMessage: "",
      passwordMessage: "",
      validate: false,
    };
  },
  validations: {
    username: { required },
    password: { required, minLength: minLength(8) },
  },

  methods: {
    async login() {
      const details = {
        username: this.username,
        password: this.password,
      };
      let formBody = [];
      for (const property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      this.validate = true;
      try {
        const res = await fetch(
          "https://wong801-portfolio.herokuapp.com/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
          }
        );
        const data = await res.json();
        if (data.success === false) {
          this.$swal.fire({
            icon: "error",
            title: "Oops..",
            text: data.msg,
          });
          return;
        } else {
          localStorage.setItem("token", data.token);
          this.$swal.fire({
            icon: "success",
            text: data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
        }
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style scoped>
.danger {
  font-size: 12px;
  color: rgb(194, 11, 11);
}
.login-container {
  display: flex;
  height: 100vh;
  color: #4a5568;
}

.image-container {
  flex: 0.5;
  background: url("../assets/image.svg") no-repeat center;
}

.login-wrapper {
  background: #e5e5e5;
  flex: 0.5;
}

.login {
  width: 45%;
  margin: 15% auto;
}
h2 {
  margin-bottom: 20px;
}
label {
  display: block;
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0;
}

.is-valid {
  outline: none;
  box-shadow: 2px 0.5px 8px -1px rgba(57, 248, 9, 0.75);
}

.is-invalid {
  outline: none;
  border: none;
  box-shadow: 2px 0.5px 8px -1px rgba(248, 6, 6, 0.75);
}
.login-form > input {
  background-color: #e5e5e5;
  border: 2px solid lightgray;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  color: #4a5568;
}

input:focus {
  outline: none;
  box-shadow: 1px 2px 20px -10px rgba(117, 105, 105, 0.75);
}

.login-option {
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember-option {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.remember-option > label,
a {
  font-size: 13px;
}

#remember {
  margin-right: 5px;
  opacity: 0.5;
}

.login-form > button {
  background-color: #04c35c;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  margin: 20px 0;
  border: none;
}

.register-option {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 20px 0;
}

.register-option > p {
  margin-right: 5px;
}

@media screen and (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  .login {
    width: 80%;
  }
}
</style>
