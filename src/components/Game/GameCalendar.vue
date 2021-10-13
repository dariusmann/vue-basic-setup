<template>
  <v-container>
    <v-calendar
      :type="calendarType"
      :events="getEvents()"
      @click:event="showEvent"
    />
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
      >
        <v-toolbar dark>
          <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <span v-html="selectedEvent.name"></span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="secondary"
            @click="selectedOpen = false"
          >
            {{$t('text.close')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>

export default {
  name: 'GameCalendar',
  props: {
    games: {
      type: Array,
      default: () => {
        return []
      }
    },
    calendarType: {
      type: String,
      required: true,
      default: 'day'
    }
  },
  data: function () {
    return {
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  methods: {
    getEvents () {
      const events = []

      for (const key in this.games) {
        const game = this.games[key]
        events.push({
          name: game.address,
          start: game.getStartFormatted(),
          end: game.getEndFormatted()
        })
      }

      return events
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => {
          this.selectedOpen = true
        }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
  }
}
</script>

<style scoped>

</style>
