//https://www.youtube.com/watch?v=iKlWaUszxB4

//Normal user sign up
function signup(){
	var username = document.getElementById("username_field").value;
	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;
	if(username != "" && email != "" && password != ""){
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data){
			console.log('uid',data.user.uid)
			newMember(data.user.uid, username, email);
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			window.alert("Message: "+errorMessage);
		  });
		window.location.href = "workoutpage.html";
	}else{
		window.alert("Incomplete form. Please fill out all the fields.");
	}
}
// Add user to db
function newMember(uid, username, email){
	firebase.database().ref('Members/' + uid).set({
		username: username,
		email: email,
		lastWorkout : "0",
		loginType: "auth",
		workoutFocus: {0:"",1:""}
	});
}
// Normal user login
function login(){
	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;
	if(email != "" && password != ""){
		var result = firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			window.alert("issuccess");
			window.location.href = "workoutpage.html";
		});
		result.catch(function(error){
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
function googleLogin(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		//check if user in db
		firebase.database().ref("/Members/"+user.uid).once('value', function(snapshot) {
			if(snapshot.exists()==false) {
				newMember(user.uid, user.displayName, user.email);
				
			}
			window.location.href = "workoutpage.html";
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
function tosignuppage(){window.location.href = "signup.html";}
function tosigninpage(){window.location.href = "signin.html";}
function toexercise1(){window.location.href = "exercise1.html";}
function logout(){
	firebase.auth().signOut();
	window.location.href = "signin.html";
}

