class UsersServices {
  #users = [];
  getUsers() {
    return this.#users
}
};

module.exports = new UsersServices();
