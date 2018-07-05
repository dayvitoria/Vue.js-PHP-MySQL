var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {nome: "", email: "", telefone: ""},
		clickedUser: {},
	},
	mounted: function(){
		console.log("mounted");
		this.getAllUser();
	},
	
	methods: {
		getAllUser: function(){
			axios.get("http://localhost/vuephpcrud/php/api.php?action=read")
			.then(function(response){
				console.log(response);
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.users = response.data.user;
				}
			});
		},

		saveUser: function(){
			//console.log(app.newUser);
			var formData = app.toFormData(app.newUser);

			axios.post("http://localhost/vuephpcrud/php/api.php?action=create", formData)
			.then(function(response){
				console.log(response);
				app.newUser = {nome: "", email: "", telefone: ""};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.getAllUser();
				}
			});
		},

		updateUser: function(){
			//console.log(app.newUser);
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuephpcrud/php/api.php?action=update", formData)
			.then(function(response){
				console.log(response);
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.successMessage = response.data.message;
					app.getAllUser();
				}
			});
		},

		deleteUser: function(){
			//console.log(app.newUser);
			var formData = app.toFormData(app.clickedUser);
			//console.log(app.clickedUser);
			axios.post("http://localhost/vuephpcrud/php/api.php?action=delete", formData)
			.then(function(response){
				console.log(response);
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message;
				}else{
					app.successMessage = response.data.message;
					app.getAllUser();
				}
			});
		},

		toFormData: function(obj){
			var form_data = new FormData();
				for(var key in obj){
					form_data.append(key, obj[key]);
				}
				return form_data;
		},

		selectUser: function(user){
			app.clickedUser = user;
		},
	}
});

