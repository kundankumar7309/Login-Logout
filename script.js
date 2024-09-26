// Dummy user data for demonstration
const users = {
    user1: 'password1',
    user2: 'password2'
};

// Username/password login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    if (users[username] && users[username] === password) {
        document.getElementById('user-name').innerText = username;
        messageDiv.innerText = '';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('googleBtn').style.display = 'none';
        document.getElementById('facebookBtn').style.display = 'none';
    } else {
        messageDiv.innerText = 'Invalid username or password';
    }
}

// Google Sign-In
function onLoadGoogle() {
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
        });
    });
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    document.getElementById('user-name').innerText = profile.getName();
    document.getElementById('message').innerText = '';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('googleBtn').style.display = 'none';
    document.getElementById('facebookBtn').style.display = 'none';
}

function logoutGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        resetPage();
    });
}

// Facebook Sign-In
function onLoadFacebook() {
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v11.0'
    });
}

function loginFacebook() {
    FB.login(response => {
        if (response.authResponse) {
            FB.api('/me', {fields: 'name'}, function(response) {
                document.getElementById('user-name').innerText = response.name;
                document.getElementById('message').innerText = '';
                document.getElementById('dashboard').style.display = 'block';
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('googleBtn').style.display = 'none';
                document.getElementById('facebookBtn').style.display = 'none';
            });
        } else {
            document.getElementById('message').innerText = 'User cancelled login or did not fully authorize.';
        }
    });
}

function logoutFacebook() {
    FB.logout(function(response) {
        resetPage();
    });
}

// Logout function
function logout() {
    logoutGoogle();
    logoutFacebook();
    resetPage();
}

// Reset the page to login state
function resetPage() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('googleBtn').style.display = 'block';
    document.getElementById('facebookBtn').style.display = 'block';
    document.getElementById('message').innerText = '';
}

// Event listeners for buttons
document.getElementById('googleBtn').onclick = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(onSignIn);
};

document.getElementById('facebookBtn').onclick = loginFacebook;
