$(document).ready(function() {
    $("#userSubmit").off().on("click", function(event){
        event.preventDefault();

        var newUser = {
            userName: $("#username").val().trim(),
            email: $("#email").val().trim(),
            location: $("#location").val().trim(),
            phoneNumber: $("#phoneNumber").val().trim(),
            hasKids: $("#")
        }
    })
})