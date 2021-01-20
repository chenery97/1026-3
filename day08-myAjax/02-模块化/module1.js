;
(function (w) {
  let username = 'chenery';

  function getUser() {
    return username
  }

  function setUser(value) {
    username = value;
  }

  const module1 = {
    getUser,
    setUser
  }
  w.module1 = module1;
})(window)