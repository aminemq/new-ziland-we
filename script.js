document.getElementById("discord-btn").addEventListener("click", function() {
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1296871632119402526&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D1296871632119402526%26redirect_uri%3Dhttps%3A%2F%2Fnewzealand-rp.netlify.app%2F%26response_type%3Dcode%26scope%3Didentify&scope=identify+guilds+guilds.join+gdm.join";
});

const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if (code) {
    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: '1296871632119402526',
            client_secret: 'MTI5Njg3MTYzMjExOTQwMjUyNg.GG4koC.kx3kgs43uVOCPVnm9HShmLVhHIWiVjYZIW06i0',
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://newzealand-rp.netlify.app/'
        })
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('is_logged_in', 'true');
        getUserInfo(accessToken);
    })
    .catch(console.error);
}

function getUserInfo(accessToken) {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(user => {
        sessionStorage.setItem('user_avatar', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
        sessionStorage.setItem('user_name', user.username);
        displayUserInfo(user);
    })
    .catch(console.error);
}

function displayUserInfo(user) {
    const discordButton = document.getElementById('discord-btn');
    const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

    const img = document.createElement('img');
    img.src = userAvatarUrl;
    img.alt = user.username;
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.borderRadius = '50%';
    img.style.cursor = 'pointer'; 
    discordButton.replaceWith(img);

    img.addEventListener("click", function() {
        logout();
    });
}

function logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_avatar');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('is_logged_in');
    window.location.href = 'https://urprolepley.web.app/';
}

window.onload = function() {
    const isLoggedIn = sessionStorage.getItem('is_logged_in');
    const accessToken = sessionStorage.getItem('access_token');
    const userAvatar = sessionStorage.getItem('user_avatar');
    const userName = sessionStorage.getItem('user_name');
    if (isLoggedIn === 'true' && accessToken && userAvatar && userName) {
        const discordButton = document.getElementById('discord-btn');

        const img = document.createElement('img');
        img.src = userAvatar;
        img.alt = userName;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.style.cursor = 'pointer'; 
        discordButton.replaceWith(img);

        img.addEventListener("click", function() {
            logout();
        });
    } else {
        const discordButton = document.getElementById('discord-btn');
        if (!discordButton) {
            const button = document.createElement('div');
            button.id = 'discord-btn';
            button.textContent = 'Login with Discord';
            document.body.appendChild(button);
            button.addEventListener("click", function() {
                window.location.href = "https://discord.com/oauth2/authorize?client_id=1276969451899846719&redirect_uri=https://urprolepley.web.app/&response_type=code&scope=identify";
            });
        }
    }
    protectPages();
}

function protectPages() {
    const protectedPages = ['/protected.html'];

    const path = window.location.pathname;
    if (protectedPages.includes(path)) {
        const isLoggedIn = sessionStorage.getItem('is_logged_in');
        if (isLoggedIn !== 'true') {
            window.location.href = 'https://urprolepley.web.app/';
        }
    }
}
