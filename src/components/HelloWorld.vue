<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('view.home.header') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('view.home.findUpComingGames.message') }}</h2>
        <p>{{ $t('view.home.findUpComingGames.callToAction') }}</p>
        <v-btn color="teal" @click="() => $router.push({name: 'Games'})">{{ $t('text.play') }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('view.home.publishOwnGames.message') }}</h2>
        <p>{{ $t('view.home.publishOwnGames.callToAction') }}</p>
        <v-btn color="teal" @click="() => $router.push({name: 'Register'})">{{ $t('text.register') }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>
          {{ $t('view.home.contact') }} <a :href="telegramContact" target="_blank">dariusmann</a>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TelegramHelper from '@/helpers/telegram.helpers'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      telegramContact: TelegramHelper.getTelegramLink('dariusmann')
    }
  }
}
</script>

<style scoped>
p {
  color: white;
}
</style>
