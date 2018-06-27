$(document).ready(function() {
    var $select1 = $('#select1'),
        $select2 = $('#select2'),
        $options = $select2.find('option');

    $select1.on('change', function() {
        $select2.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');


    $('#carouselExample').on('slide.bs.carousel', function(e) {

        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                } else if (e.direction == "right") {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
    /*search function*/
    var value = "";
    $('#searchBox').on('keyup keypress', function(event) {
        value = $(this).val().toLowerCase();
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
            $('#submit').trigger("click");
            $('#submit').attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre + "&filterType=" + filterType);
        }
    });

    $("#submit").on('click', function(event) {
        $(this).attr("href", "store.html?value=" + value);
    });

    /*login button*/
    var modal_lv = 0;
    $('.modal').on('shown.bs.modal', function(e) {
        $('.modal-backdrop:last').css('zIndex', 1051 + modal_lv);
        $(e.currentTarget).css('zIndex', 1052 + modal_lv);
        modal_lv++
    });

    $('.modal').on('hidden.bs.modal', function(e) {
        modal_lv--
    });
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDHLiFLoabQKjEizi0s6OSlpvrqA3iMBGI",
        authDomain: "test01-15f7d.firebaseapp.com",
        databaseURL: "https://test01-15f7d.firebaseio.com",
        projectId: "test01-15f7d",
        storageBucket: "test01-15f7d.appspot.com",
        messagingSenderId: "487451576900"
    };
    firebase.initializeApp(config);
    // CREATE A REFERENCE TO FIREBASE
    var messagesRef = firebase.database().ref();

    // REGISTER DOM ELEMENTS
    var messageField = $('#messageInput');
    var nameField = $('#txtEmail');
    var messageList = $('#example-messages');
    document.getElementById("btnLogin").addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
        console.log(promise);
    });

    // Add signup event
    document.getElementById("btnSignup").addEventListener('click', e => {
        // Get email and pass

        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        alert('Logout Successfully!');
    });
    //Add a realtime listener
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            btnLogout.classList.remove('dissapear');
            btnLogin.classList.add('dissapear');
            btnSignup.classList.add('dissapear');
            txtEmail.classList.add('dissapear');
            txtPassword.classList.add('dissapear');
            wtf.classList.add('dissapear');
            document.getElementById('welcomeDiv').style.display = "block";
            document.getElementById('signIn').style.display = "none";
            //document.getElementById("user").append(firebase.auth().currentUser.email);
            //document.getElementById('user').style.display = "block";

        } else {
            console.log('not logged in');
            btnLogout.classList.add('dissapear');
            btnLogin.classList.remove('dissapear');
            btnSignup.classList.remove('dissapear');
            txtEmail.classList.remove('dissapear');
            txtPassword.classList.remove('dissapear');
            wtf.classList.remove('dissapear');
            document.getElementById('welcomeDiv').style.display = "none";
            document.getElementById('signIn').style.display = "block";

            //document.getElementById("user").style.display = "none";
        }
    });

    getnow.addEventListener('click', e => {
        var user = firebase.auth().currentUser;

        if (user) {
            alert('Thanks for buying!');

        } else {
            alert('Please log in!');
        }
    });
    $("#commentSubmit").on('click', function(event) {
        var user = firebase.auth().currentUser;

        if (user) {
            var username = firebase.auth().currentUser.email;
            var message = messageField.val();
            //SAVE DATA TO FIREBASE AND EMPTY FIELD
            messagesRef.push({
                name: username,
                text: message
            });
            messageField.val('');
        } else {
            alert('Please log in!');
        }

    });
    messagesRef.limitToLast(20).on('child_added', function(snapshot) {

        //GET DATA
        var data = snapshot.val();
        var username = data.name;
        var message = data.text;
        var day = new Date();
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var messageElement = $("<div class='space'>");
        var nameElement = $("<strong class='example-chat-username'></strong>")
        $("#example-messages").append(
            $('<div class="mb-3 list-group-item rounded">').append($("<h1>", {
                text: username
            })).append($("<p>", {
                text: day.toUTCString()
            })).append($("<h3>", {
                text: message
            }))
        )
        //ADD MESSAGE
        messageList.append(messageElement)
        //SCROLL TO BOTTOM OF MESSAGE LIST
        messageList[0].scrollTop = messageList[0].scrollHeight;
    });
});