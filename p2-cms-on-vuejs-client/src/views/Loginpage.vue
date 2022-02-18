<template>
  <div>
    <div class="login-page">
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
              <div class="brand">
                <img src="../.././assets/logo.png" alt="logo" />
              </div>
              <div class="card fill">
                <div class="card-body">
                  <h4 class="card-title">Login</h4>
                  <form>
                    <div class="form-group">
                      <label for="email">E-Mail Address</label>
                      <input
                        v-model="user.email"
                        id="email"
                        type="text"
                        class="form-control"
                        name="email"
                        value=""
                        required
                        autofocus
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        v-model="user.password"
                        id="password"
                        type="password"
                        class="form-control"
                        name="password"
                      />
                    </div>

                    <Reusebutton
                      name="Sign In"
                      v-on:buttonClickReuse="loginSubmitHandler"
                    ></Reusebutton>
                  </form>
                  Don't have an account?
                  <Reusebutton
                    name="Create an Account"
                    v-on:buttonClickReuse="btnlog2reg"
                  ></Reusebutton>
                  <!-- Button Google Sign In -->
                  or Sign In with Google Account
                  <GoogleLogin
                    class="btn btn-danger btn-block"
                    v-bind:params="params"
                    v-bind:onSuccess="onSuccess"
                    v-bind:onFailure="onFailure"
                  >
                    Login With Google
                  </GoogleLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import Reusebutton from "../components/Reusebutton.vue";

export default {
  name: "Loginpage",
  components: { GoogleLogin, Reusebutton },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      params: {
        client_id:
          "290709567405-eoptli2ral4mah64t86qd9h83ue8hqqs.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    loginSubmitHandler() {
      this.$emit("postLogin", this.user);
    },
    btnlog2reg() {
      this.$emit("pageLogToReg");
    },
    onSuccess: function (googleUser) {
      console.log(googleUser.getBasicProfile());
      let gToken = googleUser.getAuthResponse().id_token;
      this.$emit("googleLogin", gToken);
    },
    onFailure: function (err) {
      console.log(err);
    },
  },
};
</script>

<style></style>
