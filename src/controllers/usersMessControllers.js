class UsersMessControllers {
  
  getMessage(req, res) {
    res.send("Привет, Redev!");
  }

  postMessage(req, res) {
    const message = req.body.message;
    res.send(message);
  }
}

module.exports = new UsersMessControllers();
