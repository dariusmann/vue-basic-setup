<template>
  <v-container>
    <v-calendar
      :type="calendarType"
      :events="getEvents()"
      :first-time="'06:00'"
      @click:event="showEvent"
    />
    <CalendarEventCard
      :selected-element="selectedElement"
      :selected-event="selectedEvent"
      :selected-open="cardOpen"
      @close="closeEvent"
    />
  </v-container>
</template>
<script>

import CalendarEventCard from '@/components/Game/Finder/CalendarEventCard'

export default {
  name: 'GameCalendar',
  components: { CalendarEventCard },
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
  computed: {
    cardOpen: function () {
      return this.selectedOpen
    }
  },
  methods: {
    getEvents () {
      const events = []

      for (const key in this.games) {
        const game = this.games[key]
        events.push({
          name: game.format + ' ' + game.address,
          start: game.getStartTimezone(),
          end: game.getEndTimezone(),
          address: game.address,
          format: game.format,
          playerLevel: game.playerLevel,
          contact: game.contact,
          comment: game.comment,
          shower: game.shower,
          parking: game.parking,
          dressingRoom: game.dressingRoom,
          locker: game.locker,
          fieldType: game.fieldType
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
    },
    closeEvent () {
      this.selectedOpen = false
    }
  }
}
</script>

<style scoped>

</style>
