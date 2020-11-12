const TOKEN = process.env.VUE_APP_TOKEN_NAME || 'heima_token'
export default {
    setToken: function (val) {
        return window.localStorage.setItem(TOKEN, JSON.stringify(val))
    },
    getToken: function () {
        return JSON.parse(window.localStorage.getItem(TOKEN));
    },
    delToken: function () {
        return window.localStorage.removeItem(TOKEN)
    }
}