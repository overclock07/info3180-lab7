/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
         <li class="nav-item">
            <router-link class="nav-link" to="/upload">Uploads</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

const Upload = Vue.component('upload-form', {
    template: `
    <form @submit.prevent="uploadPhoto" id="uploadForm" enctype="multipart/form-data">
    
        <div v-if='messageFlag' >
        
            <div v-if="!errorFlag ">
                <div class="alert alert-success" >
                    {{ message }}
                </div>
            </div>
            <div v-else >
                <ul class="alert alert-danger">
                    <li v-for="error in message">
                        {{ error }}
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="container">
        <div>
            <label for='description'> Description</label>
            <textArea type="text" name="description" class="form-control"></textArea>
        </div>
        <div>
            <label for='upload'> Upload image</label>
            <input type="file" name="file" class="form-control" />
            <button type="submit" name="submit" class="btn btn-primary">Upload file</button>
        </div>
        </div>
    </form>
    `,
    methods: {
        uploadPhoto: function(){
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        
        fetch("/api/upload", {
        method: 'POST',
        body: form_data,
        headers: {
        'X-CSRFToken': token
        },
        credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            window.self.messageFlag = true;
                
            if (jsonResponse.hasOwnProperty("errors")){
                window.self.errorFlag=true;
                window.self.message = jsonResponse.errors;
            }else if(jsonResponse.hasOwnProperty("message")){
                window.self.errorFlag = false;
                window.self.message = "File Upload Successful";
                window.self.cleanForm();
            }
            console.log(jsonResponse);
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path : "/upload ", component: Upload }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});