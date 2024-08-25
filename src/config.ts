export const isProd = () => {
    return window.location.hostname.includes('thegames.work');
}

export const config = {
    apiURL: isProd() ? 'https://thegames.work/server-symfony/' : 'http://pike.loc/',
    // lioncard node server
    //apiSocketURL: isProd() ? 'https://thegames.work/' : 'http://localhost:3000/', 
    // https://dashboard.render.com/ free node server login via githab
    apiSocketURL: isProd() ? 'https://game-pike-socket.onrender.com/' : 'http://localhost:3000/',
    //apiSocketURL: 'https://thegames.work/server-node/',
    apiSocketOptions: {path: "/server-node"},
    //apiSocketOptions: {},
};

