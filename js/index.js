//https://www.youtube.com/watch?v=iKlWaUszxB4

function signup(){
	var username = document.getElementById("username_field").value;
	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;
	if(username != "" && email != "" && password != ""){
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data){
			console.log('uid',data.user.uid)
			firebase.database().ref('Members/' + data.user.uid).set({
				  username: username,
				  email: email,
				  lastWorkout : "0",
				  loginType: "auth",
				  workoutFocus: {0:"",1:""}
			});
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			window.alert("Message: "+errorMessage);
		  });
	}else{
		window.alert("Incomplete form. Please fill out all the fields.");
	}
}
function login(){
	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;
	if(email != "" && password != ""){
		var result = firebase.auth().signInWithEmailAndPassword(email, password);
		result.catch(function(error){
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			window.alert("Message: "+errorMessage);
		})		
		;
	}else{
		window.alert("Incomplete form. Please fill out all the fields.");
	}
}
function googleLogin(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		//idk why this doesnt work
		firebase.database().ref('Members/' + user.uid).set({
			username: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			lastWorkout : "0",
			loginType: "google",
			workoutFocus: {0:"",1:""}
		});
		console.log(result);
		console.log("Success, Google Account Linked!");
	  }).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		console.log(error);
		console.log("Google Authentication Failed");
	  });
}
function logout(){
	firebase.auth().signOut();
	window.location.href = "signin.html";
}

