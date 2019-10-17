import srpBigint from 'srp-bigint';
import bufferJson from 'buffer-json';
import uniqid from 'uniqid';

export const Register = Vue.component('Register', {
  template: `
    <div id=registerApp>
      <h2>Register</h2>
      <div>{{ nameTextRegister }}</div>
      <input v-model='name' autocompconste="off" />
      <div>{{ passTextRegister }}</div>
      <input v-model='password' autocompconste="off" />
      <div>{{ emailTextRegister  }}</div>
      <input v-model='email' autocompconste="off" />
      <button v-on:click='initRegister'>{{ buttonTextRegister }}</button>
      <h5 v-if="registered" style="color:green">Вы зарегестрированы! Залогиньтесь пожалуйста!</h5>
      <h2>Log in</h2>
      <div>{{ nameTextLogin }}</div>
      <input v-model='name' autocompconste="off" />
      <div>{{ passTextLogin }}</div>
      <input v-model='password' autocompconste="off" />
      <button v-on:click='initLogin'>{{ buttonTextLogin }}</button>
    </div>
  `,
  data: function() {
    return {
      nameTextRegister: 'Enter Name',
      passTextRegister: 'Password',
      emailTextRegister: 'Email',
      buttonTextRegister: 'Register',
      nameTextLogin: 'Enter Name',
      passTextLogin: 'Password',
      buttonTextLogin: 'Login',
      registered: false,
      name: '',
      password: '',
      email: '',
      c: null,
      }
  },
  methods : {
    initRegister: async function() {
      const params = srpBigint.params['2048'];
      const secret1 = await srpBigint.genKey();
      const salt = Buffer.from(uniqid());
      const password = Buffer.from(this.$data.password);
      const identity = Buffer.from(this.$data.name);
      const verifier = srpBigint.computeVerifier(params, salt, identity, password);
      this.c = new srpBigint.Client(params, salt, identity, password, secret1);

      const data = {
        identity,
        verifier,
        salt,
        name: this.$data.name, 
        password: this.$data.password, 
        requestName: 'auth_step_1',
      }

      fetch('/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      this.$data.registered = true;
    },
    async initLogin() {
      const identity = Buffer.from(this.$data.name);
      const params = srpBigint.params['2048'];

      const data = {
        identity,
        requestName: 'auth_step_0',
      }

      const response2 = await fetch('/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response2.text();
      const salt = bufferJson.parse(result);
      const secret1 = await srpBigint.genKey();
      const password = Buffer.from(this.$data.password);
      this.c = new srpBigint.Client(params, salt, identity, password, secret1);
      const sprA = this.c.computeA();
      
      this.getAuthData(sprA);
      },
      async getAuthData(sprA) {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({requestName: 'auth_step_2'}),
        });

        const result = await response.text();

        if (this.c) {
          const buffer = bufferJson.parse(result);
          this.c.setB(buffer.buf);
          const M1 = this.c.computeM1();

          const response2 = await fetch('/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requestName: 'auth_step_3', 
              m1: M1,
              sprA
            }),
          });

          const result2 = await response2.text();
          const K = this.c.computeK();

          if (result2){
            this.$router.push({ name: 'chat', params: { key: K } });
          }
        }
      },
    }
  });
