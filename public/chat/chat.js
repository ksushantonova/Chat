import bufferJson from 'buffer-json';

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
    this.c = data.c;
  }
}

export const Chat = Vue.component('Chat', {
  template: `
  <div id="chatApp">
    <div v-for="item in messages">
      {{ item.username }} : {{ item.message }}
    </div>
    <input v-model='message' id="messageEnterBox" autocomplete="off" />
    <button v-on:click='sendMessage'>Send</button>
  </div>
  `,
  data: function() {
    return {
      message: '',
      user: null,
      socket: null,
      messages: [{
        username: 'admin',
        message: 'Nice to meet you here!'
    }],
  }},
  created: function () {
    this.getAuthData();
    this.socket = io("http://localhost:3000");
    this.$data.user = new User();
    this.socket.on("initUser", data => {
      const userData = JSON.parse(data);
      this.$data.user.initUser(userData.incomeData);
    });
    this.socket.on("push_message", msg => {
      const data = JSON.parse(msg);
      this.$data.messages.push(data);
    });
  },
  methods : {
    sendMessage: function() {
      const data = {
        message: this.$data.message,
        username: this.$data.user.nickName,
        userId: this.$data.user.userId
      }
      this.socket.emit("push_message", JSON.stringify(data));
      this.$data.message = '';
    }
  }
});
