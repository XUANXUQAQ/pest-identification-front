function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  document.cookie = `${cname}=${cvalue}; ${expires}`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

const networkUtils = {
  args: {
    form(args) {
      const formData = new FormData();
      const keys = Object.keys(args);
      keys.forEach((key) => {
        formData.append(key, args[key]);
      });
      return formData;
    },
  },
  token: {
    setToken(token) {
      setCookie('token', token, 1);
    },
    removeToken() {
      setCookie('token', '', 1);
    },
    getToken() {
      return getCookie('token');
    },
  },
  username: {
    setUsername(username) {
      setCookie('username', username);
    },
    getUsername() {
      return getCookie('username');
    },
  },
};

export default networkUtils;
