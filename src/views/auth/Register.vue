<template>
  <div>
    <h1 class='text-center'>Register</h1>
      <div class='login text-center'>
    <b-form @submit.prevent="submit" class='smallform'>
      <b-form-group
        id="input-group-1"
        label="Username"
        label-for="input-1"
      >
    <b-form-input id="input-1" v-model="form.username" type="text" placeholder="Enter Username" required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type='email'
          placeholder="Enter Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type='password'
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="warning" variant="primary">Register</b-button>
    </b-form>
      </div>
    <!-- <form @submit.prevent="register">
      <div>
        <label for="username">Username</label>
        <input v-model="form.username" type="text" autocomplete="off" placeholder="username">
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="form.email" type="text" autocomplete="off" placeholder="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="form.password" type="password">
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form> -->
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async register() {
      let res = await AuthUser.dispatch('register', this.form)
      if(res.success) {
        this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
        this.$router.push("/member")
      } else {
        this.$swal("Register Failed", res.message, "error")
      }
    },
    submit() {
      this.loading = true
      this.register()
      this.loading = false
    }
  }
}
</script>

<style lang='scss' scoped>
.login,h1 {
  margin: auto;
  width: 40%;
}
.smallform {
    margin: auto;
    width: 50%
}
</style>