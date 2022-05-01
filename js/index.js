console.log("hswj");
const headers = {
    'content-type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoeWp6cmFvcHR5bXJwYmRubmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzNTE1NzAsImV4cCI6MTk2NjkyNzU3MH0.A4pYvwvL8Mmuy4LOR2aLQ7RiWbODLo-1XSyBjjKPosA',
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoeWp6cmFvcHR5bXJwYmRubmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzNTE1NzAsImV4cCI6MTk2NjkyNzU3MH0.A4pYvwvL8Mmuy4LOR2aLQ7RiWbODLo-1XSyBjjKPosA',
//     'Range': '0-9'
 };


Vue.createApp({
    data() {
      return {
         showLoginForm:false,
         showRegisterForm:false,
         tasks : [],
         APIUrl: 'https://chyjzraoptymrpbdnncg.supabase.co/rest/v1/tasks',
         showAddForm: false,
         newName: '',
         newDescription: '',
         isLoading: false,
         editableTasks: -1,
         editName: '',
         editDescription:'',
         totalPages: 0,
         searchRequest: "",
         maxElementPage: 5,

        
      }
    },  computed:{
        searchResult(){
            const result = this.tasks.filter(task=>task.name.includes(this.searchRequest));

            // this.totalPages = Math.ceil(result.length/this.maxElementPage); //calc the quantity of pages

            return result;
        }

    },
    methods: {       
        async getTasks() {
           const fetchTasks = await fetch(`${this.APIUrl}?select=*`,{headers});
           this.tasks = await fetchTasks.json();
        },
        async addTasks(){
            
            //add new movie to dataBase
            const fetchTasks = await fetch(this.APIUrl,
                {
                    headers: headers,
                    method: 'POST',
                    body : JSON.stringify({"name":this.newName, "description" : this.newDescription})
                });

            //renew the form
            this.newName = '';
            this.newDescription = '';
            //getting again all movies
            this.getTasks();
        },
        async deleteTask (id){
            await fetch(`${this.APIUrl}?id=eq.${id}`,
                {
                    headers: headers,
                    method: 'DELETE'
                }
            );
            this.getTasks();

        },
        showEditTask(id){
            //show the camp for edit
            this.editableTasks = id;
            //get the data
            const editableTasks = this.tasks.filter(function(task){
                return task.id === id;
            })[0];
            
            //show data
            this.editName = editableTasks.name;
            this.editDescription = editableTasks.description;
        },
        async editTask (id){
            
            this.editableTasks = -1;
            const fetchTasks = await fetch(`${this.APIUrl}?id=eq.${id}`,
                {
                    headers: headers,
                    method: 'PATCH',
                    body : JSON.stringify({"name":this.editName, "description" : this.editDescription})
                });
                this.getTasks();
                
        },
        // 
        // pushMoviesIntoBD : function(){
        //     this.moviesFromAPI.forEach((movie) => {
        //         //console.log(movie.Title);
        //         fetch (this.APIUrl,
        //             {
        //                 headers: this.getHeaders(),
        //                 method:'POST',
        //                 body: JSON.stringify({"name":movie.Title, "duration" : 60})
        //             })
                
        //     });
        // },
        // getHeaders() {
        //     const rangeStart=(this.page - 1) * this.resultsNumberOnPage;
        //     const rangeFinish = rangeStart + this.resultsNumberOnPage;
            
        //     //clone headers
        //     let headersNewRange = JSON.parse(JSON.stringify(headers));
        //     //modifying the range
        //     headersNewRange.Range = `${rangeStart}-${rangeFinish}`;            
        //     return headersNewRange;
        // },
        // async getMoviesLength (){
        //     //get headers without changing range for paging
        //     const myHeaders = this.getHeaders();
        //     myHeaders.Range='';
        //     // get the list of all movies tor to get the quantity
        //     const fetchMovies = await fetch(`${this.APIUrl}?select=*`,{headers: myHeaders});
        //     const dataMovies = await fetchMovies.json();
        //     this.moviesLength=Math.ceil(dataMovies.length/this.resultsNumberOnPage);

        // },
    },
    watch:{
        searchRequest: function(){
            this.page=1;

        }
    },
    
    mounted: function() {
         this.getTasks();        
        // this.getMoviesLength();
        
    },

  }).mount('#app')