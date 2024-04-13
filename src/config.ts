export const isProd = () => window.location.hostname.includes('thegames.work');

export const config = {
    apiURL: isProd() ? 'https://thegames.work/server-symfony/' : 'http://pike.loc/',
    apiSocketURL: isProd() ? 'https://thegames.work/server-node/' : 'http://localhost:3000/',
};

