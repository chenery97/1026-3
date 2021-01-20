;
(function (w) {
  let username = 'cookie';

  function getUser() {
    return username
  }

  function setUser(value) {
    username = value;
  }

  const module2 = {
    getUser,
    setUser
  }
  w.module2 = module2;
})(window)