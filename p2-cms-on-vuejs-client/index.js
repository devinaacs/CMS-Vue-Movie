const { default: axios } = require("axios")

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        user: {
            email: "",
            password: ""
        },
        isLoggedIn: false,
        isRegistered: false,
        pageMovies: true,
        pageHistories: false,
        pageUpdate: false,
        pageAdd: false,
        pageProfile: false,
        listMovies: [],
        listHistories: [],
        choosenMovie: null,
        userId: null,
    },
    methods: {
        submitFormLogin: function (evt) {                               // SUBMIT FORM LOGIN
            axios.post('http://localhost:3000/login', this.user)
                .then(resp => {
                    // console.log(resp)
                    this.isLoggedIn = true
                    localStorage.setItem('access_token', resp.data.access_token)
                    localStorage.setItem('userId', resp.data.userId)
                    localStorage.setItem('userEmail', resp.data.userEmail)
                    localStorage.setItem('userRole', resp.data.userRole)
                    showListMovies()
                })
                .catch(err => {
                    console.log(err)
                })
        },

        submitFormRegister: function (evt) {                            // SUBMIT FORM REGISTER
            axios.post('http://localhost:3000/register', this.user)
                .then(resp => {
                    console.log(resp)
                    this.user.email = ''
                    this.user.password = ''
                    this.isRegister = false
                })
                .catch(err => {
                    console.log(err)
                })
        },

        clickLogOut: function (evt) {                                   // LOG OUT
            this.isLoggedIn = false
            this.user.email = ''
            localStorage.clear()
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        },

        showListMovies: function (evt) {                                // SHOW MOVIE TABLE
            this.pageMovies = true
            this.pageHistories = false
            this.pageUpdate = false
            this.pageAdd = false
            this.pageProfile = false
            const access_token = localStorage.getItem('access_token')
            axios.get('http://localhost:3000/movies', { headers: { access_token } })
                .then(resp => {
                    // console.log(resp)
                    const data = resp.data.listMovie.filter(e => e.status !== "Archived")
                    console.log(data)
                    this.listMovies = data
                })
                .catch(err => {
                    console.log(err)
                })
        },

        showListHistories: function (evt) {                             // SHOW HISTORY TABLE
            this.pageMovies = false
            this.pageHistories = true
            this.pageUpdate = false
            this.pageAdd = false
            this.pageProfile = false
            const access_token = localStorage.getItem('access_token')
            axios.get('http://localhost:3000/history', { headers: { access_token } })
                .then(resp => {
                    // console.log(resp)
                    this.listHistories = resp.data.historyList
                })
                .catch(err => {
                    console.log(err)
                })
        },

        postAddMovie: function (evt) {                                  // SHOW ADD FORM
            const access_token = localStorage.getItem('access_token')
            axios.post('http://localhost:3000/movies', { headers: { access_token } })
                .then(resp => {
                    // console.log(resp)
                    this.showListMovies()
                })
                .catch(err => {
                    console.log(err)
                })
        },

        findMovieId: function (evt) {                                   // FIND MOVIE BY ID
            const access_token = localStorage.getItem('access_token')
            axios.get(`http://localhost:3000/movies/${id}`, { headers: { access_token } })
                .then(resp => {
                    this.choosenMovie = resp.data.dataMovie
                    this.showListMovies()
                })
                .catch(err => console.log(err))
        },

        postEdit: function (evt) {                                      // SHOW EDIT FORM
            const access_token = localStorage.getItem('access_token')
            axios.put(`http://localhost:3000/movies/${id}`, { data: this.choosenMovie }, { headers: { access_token } })
                .then(resp => {
                    this.showListMovies()
                })
                .catche(err => console.log(err))
        },

        PageHandler: function (evt) {                                   // PAGE HANDLER
            this.pageMovies = true
            this.pageHistories = false
            this.pageUpdate = false
            this.pageAdd = false
            this.pageProfile = false
        }
    },
    created: function () {
        const access_token = localStorage.getItem("access_token")
        if (access_token) {
            axios.get(`http:localhost:3000/users`, { headers: { access_token } })
                .then(result => {
                    this.userId = result.data.userId
                })
                .catch(err => {
                    console.log(err);
                })
            this.showListMovies()
            this.isLoggedIn = true
        } else {
            this.isLoggedIn = false
        }
    }
})