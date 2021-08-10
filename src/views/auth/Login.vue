<template>
<div class='text-center'>
    <h1>Log In</h1>
      <div class='login'>
    <b-form @submit.prevent="submit" class='smallform'>
      <b-form-group
        id="input-group-1"
        label="Username"
        label-for="input-1"
      >
    <b-form-input id="input-1" v-model="form.email" type="text" placeholder="Enter Username or Email" required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type='password'
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log in</b-button>
    </b-form>
  </div>
</div>
    <!-- <div class='text-center'>
        <h1>Log In</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Username</label>
                <input v-model="form.email" type="text" placeholder="Enter Username or Email" autocomplete="off">
            </div>

            <div>
                <label for="password">Password</label>
                <input v-model="form.password" type="password" placeholder='Enter Password'>
            </div>

            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    </div> -->
</template>

<script>
// import AuthService from '@/services/AuthService'
import AuthUser from "@/store/AuthUser"
export default {
    data(){
        return{
            form:{
                email: '',
                password: ''
            },
            loading: false
        }
    },
    methods:{
        async login(){

            let res = await AuthUser.dispatch('login',this.form)
            if(res.success){
                this.$swal("Login Success", `Welcome, ${res.user.username}`, "success")
                this.$router.push('/')
            }
            else{
                this.$swal("Login Failed", res.message, "error")
            }
            console.log(this.form);
        },
        submit() {
            this.loading = true

      // do something
            this.login()

            this.loading = false
    }

    }
}
</script>

<style lang="scss" scoped>
    .login {
        margin: auto;
        width: 40%;
    }
    .smallform {
        margin: auto;
        width: 50%
    }
</style>
