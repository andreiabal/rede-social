$(document).ready(function() {
  $(".sign-up-button").click(function(event) {
    event.preventDefault();

    var email = $(".sign-up-email").val();
    var password = $(".sign-up-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response) {
      if(response.operationType === "signIn") {
        $(".sign-up-email").val("");
        $(".sign-up-password").val("");
        alert("Bem vindo")
        window.location = "todo.html";
      }
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    });
  });

  $(".sign-in-button").click(function(event) {
    event.preventDefault();

    var email = $(".sign-in-email").val();
    var password = $(".sign-in-password").val();


    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response) {
      if(response.operationType === "signIn") {
        $(".sign-up-email").val("");
        $(".sign-up-password").val("");
        alert("Bem vindo")
        window.location = "todo.html";
      }
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(errorCode, errorMessage);
    });
  });
});
