class User {
  constructor() {
    this.nickName = "";
    this.email = "";
    this.password = "";
    this.userId = "";
  }

  initUser(data) {
    this.nickName = data.name;
    this.email = data.email;
    this.password = data.password;
    this.userId = data.userId;
  }
}

const chatApp = new Vue({
  el: '#chatApp',
  data: {
    message: '',
    user: null,
    socket: null,
    messages: [{
      username: 'admin',
      message: 'Nice to meet you here!'
    }],
  },
  created: function () {
    this.socket = io("http://localhost:3000");
    this.$data.user = new User();
    this.socket.on("initUser", data => {
      this.$data.user.initUser(data);
    });
    this.socket.on("message", msg => {
      const data = JSON.parse(msg);
      chatApp.messages.push(data);
    });
  },
  methods : {
    sendMessage: function() {
      const data = {
        message: this.$data.message,
        username: this.$data.user.nickName,
        userId: this.$data.user.userId
      }
      this.socket.emit("message", JSON.stringify(data));
      this.$data.message = '';
    }
  }
});
