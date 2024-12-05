
//Select Google boton


window.addEventListener('load', function () {

    document.getElementById('sign-in-google').addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Loggin sucessfull', result.user);
            })

            .catch(function (error) {
                console.log('Loggin fail', error);
            });


    });

    document.getElementById('sign-in-traditional').addEventListener('click', function () {

        var emailTxt = document.getElementById('email').value;
        var passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log('Loggin sucessfull');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('Loggin fail', error);
            });


    });

    //SignIn by CellPhone

    function getPhoneNumberFromUserInput() {
        return "+16042039559"
    }

    document.getElementById('sign-in-phone').
        addEventListener('click', function () {

            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

            const phoneNumber = getPhoneNumberFromUserInput();
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;

                    const code = '821028';
                    confirmationResult.confirm(code).then((result) => {
                        // User signed in successfully.
                        const user = result.user;
                        // ...
                    }).catch((error) => {
                        // User couldn't sign in (bad verification code?)
                        // ...
                    });


                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                    alert(error)
                });
        });

    document.getElementById('sign-in-facebook').addEventListener('click', function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;
                // IdP data available in result.additionalUserInfo.profile.
                // ...

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    });


});

