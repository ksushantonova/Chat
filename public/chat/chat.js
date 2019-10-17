import aes256 from 'aes256';
import bufferJson from 'buffer-json';

class User {
  constructor() {
    this.nickName = '';
    this.userId = '';
  }

  initUser(data) {
    this.nickName = data.name;
    this.userId = data.userId;
  }
}

export default Chat = Vue.component('Chat', {
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
      key: '',
      user: null,
      socket: null,
      messages: [{
        username: 'admin',
        message: 'Nice to meet you here!'
    }],
  }},
  created: function () {
    this.$data.key = bufferJson.stringify(this.$route.params.key);
    this.socket = io("http://localhost:3000");
    this.$data.user = new User();

    this.socket.on("initUser", data => {
      const userData = JSON.parse(data);
      this.$data.user.initUser(userData.incomeData);
    });
    
    this.socket.on("push_message", msg => {
      const data = JSON.parse(msg);
      const message = {
        message: aes256.decrypt(this.$data.key, data.message),
        username: this.user.nickName
      }
      this.$data.messages.push(message);
    });
  },
  methods : {
    sendMessage: function() {
      const encryptedMessage = aes256.encrypt(this.$data.key, this.$data.message);
      const data = {
        message: encryptedMessage,
        username: this.$data.user.nickName,
        userId: this.$data.user.userId
      }
      this.socket.emit("push_message", JSON.stringify(data));
      this.$data.message = '';
    }
  }
});
