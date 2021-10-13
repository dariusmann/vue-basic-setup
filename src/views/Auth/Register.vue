<template>
  <div>
    <h1>{{$t('view.auth.register.header')}}</h1>
    <RegisterForm/>
  </div>
</template>

<script>
import RegisterForm from '@/components/Auth/RegisterForm'
export default {
  name: 'Register',
  components: { RegisterForm }
}
</script>

<style scoped>

</style>
