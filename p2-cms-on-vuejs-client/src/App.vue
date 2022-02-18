<template>
  <div>
    <div v-if="!isLoggedIn">
      <loginpage
        v-show="showLoginPage"
        v-on:postLogin="appLoginHandler"
        v-on:pageLogToReg="logToReg"
        v-on:googleLogin="postGoogleLogin"
      >
      </loginpage>

      <regispage
        v-show="!showLoginPage"
        v-on:postRegis="appRegisHandler"
        v-on:pageRegToLog="logToReg"
      >
      </regispage>
    </div>

    <div v-if="isLoggedIn">
      <div class="wrapper">
        <!-- Sidebar  -->
        <sidebar
          v-on:clickLogOut="logOut"
          v-on:clickMovPage="
            (showMoviePage = true),
              (showHistoryPage = false),
              (showAddPage = false)
          "
          v-on:clickHisPage="
            (showHistoryPage = true),
              (showMoviePage = false),
              (showAddPage = false)
          "
          v-on:clickAddPage="
            (showAddPage = true),
              (showMoviePage = false),
              (showHistoryPage = false)
          "
        >
        </sidebar>

        <!-- App Content  -->
        <div id="content">
          <!-- Table -->
          <movietable
            v-if="showMoviePage"
            v-bind:listMovies="listMovies"
            v-on:statusTransfer="changeStatus"
            v-on:idTransfer="editHandler"
          ></movietable>
          <historytable
            v-if="showHistoryPage"
            v-bind:listHistories="listHistories"
          ></historytable>

          <!-- Form -->
          <add-form
            name="Add Form"
            v-if="showAddPage"
            v-bind:listGenres="listGenres"
            v-on:postAdd="formAddMovie"
            v-on:clickCancelButton="clickCancelButton"
          >
          </add-form>

          <!-- try reuse form -->
          <add-form
            name="Edit Form"
            v-if="showEditPage"
            v-bind:listGenres="listGenres"
            v-bind:choosenMovie="choosenMovie"
            v-on:postAdd="formEditMovie"
            v-on:clickCancelButton="clickCancelButton"
          >
          </add-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "regenerator-runtime";
import Loginpage from "./views/Loginpage.vue";
import Regispage from "./views/Regispage.vue";
import AddForm from "./views/AddForm.vue";
import Historytable from "./views/Historytable.vue";
import Movietable from "./views/Movietable.vue";
import Sidebar from "./views/Sidebar.vue";

import Swal from "sweetalert2";
export default {
  components: {
    Loginpage,
    Regispage,
    Movietable,
    Historytable,
    AddForm,
    Sidebar,
  },
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      showLoginPage: true,
      showMoviePage: true,
      showHistoryPage: false,
      showAddPage: false,
      showEditPage: false,
      listMovies: [],
      listHistories: [],
      listGenres: [],
      choosenMovie: null,
    };
  },
  methods: {
    logToReg() {
      if (this.showLoginPage) {
        this.showLoginPage = false;
      } else {
        this.showLoginPage = true;
      }
    },

    clickCancelButton() {
      this.fetchMovies();
    },

    pageHandler() {
      this.showMoviePage = false;
      this.showHistoryPage = false;
      this.showAddPage = false;
      this.showEditPage = false;
    },

    async appLoginHandler(param) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: param.email,
          password: param.password,
        });
        const access_token = response.data.access_token;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("userId", response.data.userId);
        this.isLoggedIn = true;
        this.fetchMovies();
        this.fetchHistories();
        Swal.fire({
          title: `Welcome, ${response.data.userEmail}`,
          icon: "success",
        });
      } catch (err) {
        const errmessage = err.response.data.error_message;
        Swal.fire({
          title: errmessage,
          icon: "warning",
        });
      }
    },

    async appRegisHandler(param) {
      try {
        const response = await axios.post("http://localhost:3000/register", {
          email: param.email,
          password: param.password,
        });
        this.showLoginPage = true;
        Swal.fire({
          title: `${response.data.message}`,
          icon: "success",
        });
      } catch (err) {
        const errmessage = err.response.data.error_message;
        Swal.fire({
          title: errmessage,
          icon: "warning",
        });
      }
    },

    logOut() {
      localStorage.clear();
      this.isLoggedIn = false;
      Swal.fire({
        title: "You are logged out.",
        icon: "success",
      });
    },

    async fetchMovies() {
      try {
        const response = await axios.get("http://localhost:3000/movies", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        const data = response.data.listMovie.filter(
          (e) => e.status !== "Archived"
        );
        this.listMovies = data;
        this.pageHandler();
        this.showMoviePage = true;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchHistories() {
      try {
        const response = await axios.get("http://localhost:3000/history", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.listHistories = response.data.historyList;
      } catch (err) {
        console.log(err);
      }
    },

    async getGenres() {
      try {
        const response = await axios.get("http://localhost:3000/genres", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.listGenres = response.data.dataGenre;
      } catch (err) {
        console.log(err);
      }
    },

    async formAddMovie(param) {
      try {
        param.authorId = localStorage.getItem("userId");
        console.log(param);
        const response = await axios.post(
          "http://localhost:3000/movies",
          param,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          title: `Movie ${response.data.createdMovie.title} successfully created.`,
          icon: "success",
        });
        this.fetchMovies();
        this.fetchHistories();
      } catch (err) {
        const errmessage = err.response.data.error_message;
        Swal.fire({
          title: errmessage,
          icon: "warning",
        });
      }
    },

    async changeStatus(event, id) {
      try {
        console.log(event, id, "-----");
        const response = await axios({
          method: "patch",
          url: `http://localhost:3000/movies/${id}`,
          data: { status: event },
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.fetchMovies();
        this.fetchHistories();
        Swal.fire({
          title: `${response.data.createdHistory.description}`,
          icon: "success",
        });
      } catch (err) {
        console.log(err);
      }
    },

    async editHandler(id) {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(response.data.dataMovie);
        this.choosenMovie = response.data.dataMovie;
        console.log(this.choosenMovie);
        this.showMoviePage = false;
        this.showEditPage = true;
        this.getGenres();
        Swal.fire({
          title: "Please tap two times 😬",
        });
      } catch (err) {
        console.log(err);
      }
    },

    async formEditMovie() {
      try {
        const data = {
          title: this.choosenMovie.title,
          synopsis: this.choosenMovie.synopsis,
          trailerUrl: this.choosenMovie.trailerUrl,
          imgUrl: this.choosenMovie.imgUrl,
          rating: this.choosenMovie.rating,
          genreId: this.choosenMovie.genreId,
          authorId: localStorage.getItem("userId"),
        };
        const response = await axios.put(
          `http://localhost:3000/movies/${this.choosenMovie.id}`,
          data,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.fetchMovies();
        this.fetchHistories();
        this.showEditPage = false;
        Swal.fire({
          title: `${response.data.editedMovie.title} successfully edited.`,
          icon: "success",
        });
      } catch (err) {
        const errmessage = err.response.data.error_message;
        Swal.fire({
          title: errmessage,
          icon: "warning",
        });
      }
    },

    postGoogleLogin: async function (token) {
      try {
        console.log("-------");
        const response = await axios.post(
          `http://localhost:3000/login-google`,
          { token: token }
        );
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("userId", response.data.userId);
        this.isLoggedIn = true;
        this.fetchMovies();
        Swal.fire({
          title: `Welcome, ${response.data.userEmail}`,
          icon: "success",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  created() {
    if (localStorage.getItem("access_token")) {
      this.isLoggedIn = true;
      this.fetchMovies();
      this.fetchHistories();
      this.getGenres();
    }
  },
};
</script>

<style></style>
