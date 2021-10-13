<template>
  <div>
    <h1>{{$t('view.auth.login.header')}}</h1>
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm'

export default {
  name: 'Login',
  components: { LoginForm }
}
</script>

<style scoped>

</style>
