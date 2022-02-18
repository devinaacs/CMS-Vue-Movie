<template>
    <div>
        <div id="add-page">
            <div class="card-header">Edit Movie</div>
            <div class="card-body">
                <form id="edit-form" v-on:submit.prevent="submitEditFormHandler">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input v-model="choosenMovie.title" type="text" class="form-control" id="add-title" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Synopsis</label>
                        <textarea v-model="choosenMovie.synopsis" class="form-control" id="add-synopsis"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Rating</label>
                        <input v-model="choosenMovie.rating" type="number" class="form-control" id="add-rating" />
                    </div>

                     <div class="mb-3">
                        <label class="form-label">Genre</label>
                        <select v-model="choosenMovie.genreId" class="js-example-placeholder-single js-states form-control" id="add-genreId" >
                            <option v-for="genre in listGenres" v-bind:key="genre.id" v-bind:value="genre.id">{{ genre.name }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Poster Url</label>
                        <input v-model="choosenMovie.imgUrl" type="text" class="form-control" id="add-imgUrl" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Trailer Url</label>
                        <input v-model="choosenMovie.trailerUrl" type="text" class="form-control" id="add-trailerUrl" />
                    </div>

                    <button type="submit" class="btn btn-primary"> Submit </button>
                    <button type="button" class="btn btn-primary"  id="cancel-add-button" > Cancel </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Editform",
    props: ['listGenres', 'choosenMovie'],
    data() {
        return {
            editMovie: {
                title: "",
                synopsis: "",
                trailerUrl: "",
                imgUrl: "",
                rating: "",
                genreId: "",
            }
        }
    }, 
    methods: {
        submitEditFormHandler() {
            this.$emit("postEdit")
        }
    }
}
</script>

<style>

</style>