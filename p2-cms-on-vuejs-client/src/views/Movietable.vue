<template>
  <div>
    <div class="card-header">Movie Table</div>
    <div class="limiter">
      <div class="container-fluid">
        <div>
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th style="min-width: 200px">Synopsis</th>
                  <th>Author</th>
                  <th>Rating</th>
                  <th>Genre</th>
                  <th style="width: 5em">Trailer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(movie, index) in listMovies" :key="movie.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      v-bind:src="movie.imgUrl"
                      style="width: 40px; height: 50px"
                    />
                  </td>
                  <td>{{ movie.title }}</td>
                  <td>
                    <select v-on:change="changeStatus($event, movie.id)">
                      <option disabled>{{ movie.status }}</option>
                      <option
                        value="Active"
                        v-bind:selected="movie.status === 'Active'"
                      >
                        Active
                      </option>
                      <option
                        value="Inactive"
                        v-bind:selected="movie.status === 'Inactive'"
                      >
                        Inactive
                      </option>
                      <option
                        value="Archived"
                        v-bind:selected="movie.status === 'Archived'"
                      >
                        Archived
                      </option>
                    </select>
                  </td>
                  <td>{{ movie.synopsis }}</td>
                  <td>{{ movie.User.username }}</td>
                  <td>{{ movie.rating }}</td>
                  <td>{{ movie.Genre.name }}</td>
                  <td>
                    <a v-bind:href="movie.trailerUrl" target="_blank">{{
                      movie.trailerUrl
                    }}</a>
                  </td>
                  <td>
                    <button
                      v-on:click="toEdit(movie.id)"
                      type="button"
                      class="btn btn-danger btn-block"
                    >
                      Edit</button
                    ><br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movietable",
  props: ["listMovies"],
  methods: {
    changeStatus(event, id) {
      const status = event.target.value;
      this.$emit("statusTransfer", status, id);
      console.log(status, id);
    },
    toEdit(id) {
      console.log(id);
      this.$emit("idTransfer", id);
    },
  },
};
</script>

<style></style>
