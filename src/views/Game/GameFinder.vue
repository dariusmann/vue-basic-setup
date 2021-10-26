<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('view.game.gameFinder.header') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="selectedCalendar"
          :items="calendarOptions"
          :label="$t('view.game.gameFinder.calendarView')"
          item-text="label"
          item-value="value"
          @change="change"
          return-object
        />
      </v-col>
      <v-col cols="6" class="tw-my-auto">
        <FilterDialog @change="filterChange"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <FilterLabelContainer @removed="filterRemoved"/>
      </v-col>
    </v-row>
    <GameCalendar :games="games" :calendar-type="selectedCalendar.value"/>
  </v-container>
</template>

<script>
import GameCalendar from '@/components/Game/Finder/GameCalendar'
import GameService from '@/services/game.service'
import moment from 'moment'
import { GameTypes } from '@/constants/game.constants'
import FilterDialog from '@/components/Game/Finder/Filter/FilterDialog'
import FilterLabelContainer from '@/components/Game/Finder/Filter/FilterLabelContainer'

export default {
  name: 'GameFinder',
  components: { FilterLabelContainer, FilterDialog, GameCalendar },
  data: function () {
    return {
      games: [],
      selectedCalendar: {
        value: 'day',
        label: this.$i18n.t('text.today')
      },
      calendarOptions: [
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
    await this.fetchGames()
  },
  methods: {
    change: async function () {
      await this.fetchGames()
    },
    filterChange: async function () {
      await this.fetchGames()
    },
    filterRemoved: async function () {
      await this.fetchGames()
    },
    fetchGames: async function () {
      if (this.selectedCalendar.value === 'day') {
        const from = moment()
        const to = moment()

        this.games = await GameService.readGames(GameTypes.Soccer, from, to)
      }

      if (this.selectedCalendar.value === '4day') {
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
