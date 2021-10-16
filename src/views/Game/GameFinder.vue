<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('view.game.gameFinder.header') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="calendarType"
          :items="calendarTypes"
          :label="$t('view.game.gameFinder.calendarView')"
          item-text="label"
          item-value="value"
          @change="change"
          return-object
        />
      </v-col>
    </v-row>
    <GameCalendar :games="games" :calendar-type="calendarType.value"/>
  </v-container>
</template>

<script>
import GameCalendar from '@/components/Game/Finder/GameCalendar'
import GameService from '@/services/game.service'
import moment from 'moment'
import { GameTypes } from '@/constants/game.constants'

export default {
  name: 'GameFinder',
  components: { GameCalendar },
  data: function () {
    return {
      games: [],
      calendarType: {
        value: 'day',
        label: this.$i18n.t('text.today')
      },
      calendarTypes: [
        {
          value: 'day',
          label: this.$i18n.t('text.today')
        },
        {
          value: '4day',
          label: this.$i18n.t('view.game.gameFinder.nextFourDays')
        }
      ]
    }
  },
  created: async function () {
    const from = moment()
    const to = moment()

    this.games = await GameService.readGames(GameTypes.Soccer, from, to)
  },
  methods: {
    change: async function (selection) {
      if (selection.value === 'day') {
        const from = moment()
        const to = moment()

        this.games = await GameService.readGames(GameTypes.Soccer, from, to)
      }

      if (selection.value === '4day') {
        const from = moment()
        const to = moment().add(4, 'days')

        this.games = await GameService.readGames(GameTypes.Soccer, from, to)
      }
    }
  }
}
</script>

<style scoped>

</style>
