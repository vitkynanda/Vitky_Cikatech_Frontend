<template>
  <div class="register-container">
    <div class="image-container"></div>
    <div class="register-wrapper">
      <div class="register">
        <p>Get started</p>
        <h2>Create your account</h2>
        <div></div>
        <form class="register-form" v-on:submit.prevent="register">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            v-model.trim="v$.email.$model"
            :class="{
              'is-invalid': v$.email.$error,
              'is-valid': !v$.email.$invalid,
            }"
          />
          <span
            class="danger"
            v-if="validate && !v$.email.$error && v$.email.$invalid"
            >Email required</span
          >
          <div class="name-input">
            <div class="firstname">
              <label for="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                v-model.trim="v$.firstname.$model"
                :class="{
                  'is-invalid': v$.firstname.$error,
                  'is-valid': !v$.firstname.$invalid,
                }"
              />
              <span
                class="danger"
                v-if="validate && !v$.firstname.$error && v$.firstname.$invalid"
                >Firstname required</span
              >
            </div>
            <div class="lastname">
              <label for="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                v-model.trim="v$.lastname.$model"
                :class="{
                  'is-invalid': v$.lastname.$error,
                  'is-valid': !v$.lastname.$invalid,
                }"
              />
              <span
                class="danger"
                v-if="validate && !v$.lastname.$error && v$.lastname.$invalid"
                >Lastname required</span
              >
            </div>
          </div>
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            v-model.trim="v$.username.$model"
            :class="{
              'is-invalid': v$.username.$error,
              'is-valid': !v$.username.$invalid,
            }"
          />
          <span
            class="danger"
            v-if="validate && !v$.username.$error && v$.username.$invalid"
            >Username required</span
          >
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            v-model.trim="v$.password.$model"
            :class="{
              'is-invalid': v$.password.$error,
              'is-valid': !v$.password.$invalid,
            }"
          />
          <span
            class="danger"
            v-if="validate && !v$.password.$error && v$.password.$invalid"
            >Password required</span
          >
          <span class="danger" v-if="v$.password.$error && v$.password.$invalid"
            >Password must be 8 character</span
          >
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            v-model.trim="v$.conPassword.$model"
            :class="{
              'is-invalid': v$.conPassword.$error,
              'is-valid': !v$.conPassword.$invalid,
            }"
          />
          <span
            class="danger"
            v-if="validate && !v$.conPassword.$error && v$.conPassword.$invalid"
            >Confirm password required</span
          >
          <span class="danger " v-if="validate && !passwordConfirmation"
            >Password must be same</span
          >

          <button type="submit">Register now</button>
          <div class="login-option">
            <p>Already have an account ?</p>
            <router-link to="/login">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
export default {
  name: "Register",
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      conPassword: "",
      validate: false,
      passwordConfirmation: false,
      success: false,
    };
  },
  validations: {
    email: { required, email },
    firstname: { required },
    lastname: { required },
    username: { required },
    password: { required, minLength: minLength(8) },
    conPassword: { required, minLength: minLength(8) },
  },

  methods: {
    register() {
      const { email, firstname, lastname, username, password } = this;
      const details = {
        email: email,
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password,
      };
      let formBody = [];
      for (const property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      this.validate = true;

      if (this.password === this.conPassword) {
        this.passwordConfirmation = true;
      } else {
        return;
      }
      try {
        fetch("https://wong801-portfolio.herokuapp.com/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              this.$swal.fire({
                icon: "error",
                title: "Oops..",
                text: data.msg.charAt(0).toUpperCase() + data.msg.slice(1),
              });
              return;
            } else {
              this.$cookie.set("token", data.token);
              localStorage.setItem("token", data.token);
              this.$swal.fire({
                icon: "success",
                text: data.msg.charAt(0).toUpperCase() + data.msg.slice(1),
                showConfirmButton: false,
                timer: 1500,
              });
              this.$router.push("/login");
            }
          });
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style scoped>
.is-valid {
  outline: none;
  box-shadow: 2px 0.5px 8px -1px rgba(57, 248, 9, 0.75);
}

.is-invalid {
  outline: none;
  border: none;
  box-shadow: 2px 0.5px 8px -1px rgba(248, 6, 6, 0.75);
}
.danger {
  font-size: 12px;
  color: rgb(194, 11, 11);
}
.register-container {
  height: 100vh;
  display: flex;
  color: #4a5568;
}

.image-container {
  flex: 0.5;
  background: url("../assets/image.svg") no-repeat center/ cover;
}

input:focus {
  outline: none;
  box-shadow: 1px 2px 21px -10px rgba(117, 105, 105, 0.75);
}

.register-wrapper {
  background: #e5e5e5;
  flex: 0.5;
}

.register {
  width: 45%;
  margin: 5% auto;
}

.register > p {
  font-size: 14px;
  font-weight: 400;
}

.register > h2 {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 400;
  margin: 8px 0;
}

input {
  background-color: #e5e5e5;
  border: 1.5px solid lightgray;
  padding: 8px;
  border-radius: 5px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  color: #4a5568;
}

.name-input {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 20px;
  font-size: 14px;
}

.register-form > button {
  background-color: #04c35c;
  color: white;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  border: none;
}

.login-option {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 20px 0;
}

.login-option > p {
  margin-right: 5px;
}

@media only screen and (max-width: 768px) {
  .register-container {
    flex-direction: column;
  }
  .register {
    width: 80%;
  }
}
</style>
