<template>
  <div>
    <div id="add-page">
      <div class="card-header">{{ name }}</div>
      <div class="card-body">
        <form id="add-form" v-on:submit.prevent="submitAddFormHandler">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input
              v-model="addMovie.title"
              type="text"
              class="form-control"
              id="add-title"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Synopsis</label>
            <textarea
              v-model="addMovie.synopsis"
              class="form-control"
              id="add-synopsis"
            ></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">Rating</label>
            <input
              v-model="addMovie.rating"
              type="number"
              class="form-control"
              id="add-rating"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Genre</label>
            <select
              v-model="addMovie.genreId"
              class="js-example-placeholder-single js-states form-control"
              id="add-genreId"
            >
              <option
                v-for="genre in listGenres"
                :key="genre.id"
                :value="genre.id"
              >
                {{ genre.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Poster Url</label>
            <input
              v-model="addMovie.imgUrl"
              type="text"
              class="form-control"
              id="add-imgUrl"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Trailer Url</label>
            <input
              v-model="addMovie.trailerUrl"
              type="text"
              class="form-control"
              id="add-trailerUrl"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          <cancelbutton
            v-on:clickCancelButton="clickCancelButton"
          ></cancelbutton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Cancelbutton from "../components/Cancelbutton.vue";
export default {
  components: { Cancelbutton },
  name: "Addform",
  props: ["listGenres", "choosenMovie", "name"],
  data() {
    return {
      addMovie: {
        title: "",
        synopsis: "",
        trailerUrl: "",
        imgUrl: "",
        rating: "",
        genreId: "",
      },
    };
  },
  methods: {
    submitAddFormHandler() {
      this.$emit("postAdd", this.addMovie);
    },
    clickCancelButton() {
      this.$emit("clickCancelButton");
    },
  },
  watch: {
    choosenMovie() {
      console.log("-----------------------");
      this.addMovie.title = this.choosenMovie.title;
      this.addMovie.synopsis = this.choosenMovie.synopsis;
      this.addMovie.trailerUrl = this.choosenMovie.trailerUrl;
      this.addMovie.imgUrl = this.choosenMovie.imgUrl;
      this.addMovie.rating = this.choosenMovie.rating;
      this.addMovie.genreId = this.choosenMovie.genreId;
    },
  },
};
</script>

<style></style>
