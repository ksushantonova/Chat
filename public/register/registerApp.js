Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: '/chat', name: 'chat' }
  ]
});

const registerApp = new Vue({
  el: '#registerApp',
  router,
  data: {
    nameText: 'Enter Name',
    passText: 'Password',
    emailText: 'Email',
    buttonText: 'Start',
    name: '',
    pass: '',
    email: '',
    router: null
  },
  methods : {
    initRegister: async function() {
      const data = {
        name: this.$data.name, pass: this.$data.pass, email: this.$data.email
      }
        fetch('/chat', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        this.$router.push('chat');
        this.$router.go('chat');
    },
  }
});