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
         showTasks:false,
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
         showSearch: false,
         maxElementPage: 5,
         el: '#wrapper',
         seen:true

      }
    }, 
     computed:{
        searchResult(){
            const result = this.tasks.filter(task=>task.name.includes(this.searchRequest));
            return result;
        }
    },
    methods: {
        
        openRegister() {
            document.getElementById("login").style.display="none";
            this.showRegisterForm = !this.showRegisterForm;
        },
        closeLogin() {
            document.getElementById("login").style.display="none";
            this.showTasks = !this.showTasks;
        },
        openLogin(){
            this.showLoginForm = !this.showLoginForm;
            document.getElementById("logo").style.display="none";
        },
        async getTasks() {
           const fetchTasks = await fetch(`${this.APIUrl}?select=*`,{headers});
           this.tasks = await fetchTasks.json();
        },
        async addTasks(){
            //add new task to dataBase
            const fetchTasks = await fetch(this.APIUrl,
                {
                    headers: headers,
                    method: 'POST',
                    body : JSON.stringify({"name":this.newName, "description" : this.newDescription})
                });

            //renew the form
            this.newName = '';
            this.newDescription = '';

            //getting again all tasks
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
    },
    watch:{
        searchRequest: function(){
            this.page=1;

        }
    },
    mounted: function() {
         this.getTasks();
    }

  }).mount('#app')