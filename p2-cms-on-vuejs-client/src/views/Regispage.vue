<template>
  <div>
    <div class="regis-page">
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
              <div class="brand">
                <img src="../.././assets/logo.png" alt="logo" />
              </div>
              <div class="card fill">
                <div class="card-body">
                  <h4 class="card-title">Registration</h4>
                  <form v-on:submit.prevent="regisSubmitHandler">
                    <div class="form-group">
                      <label for="email">E-Mail Address</label>
                      <input
                        v-model="user.email"
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
                        type="password"
                        class="form-control"
                        name="password"
                      />
                    </div>

                    <Reusebutton
                      name="Sign Up"
                      v-on:buttonClickReuse="regisSubmitHandler"
                    >
                    </Reusebutton>
                    Already have an account?
                    <Reusebutton
                      name="Login Now"
                      v-on:buttonClickReuse="btnreg2log"
                    ></Reusebutton>
                  </form>
                  <!-- Button Google Sign In -->
                  or Sign In with Google Account
                  <GoogleLogin
                    class="btn btn-danger btn-block"
                    :params="params"
                    :onSuccess="onSuccess"
                    :onFailure="onFailure"
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
  components: { GoogleLogin, Reusebutton },
  name: "Regispage",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    regisSubmitHandler() {
      this.$emit("postRegis", this.user);
    },
    btnreg2log() {
      this.$emit("pageRegToLog");
    },
  },
};
</script>

<style></style>
