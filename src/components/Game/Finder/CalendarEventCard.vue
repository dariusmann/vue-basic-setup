<template>
  <v-menu
    v-model="selectedOpen"
    :close-on-content-click="false"
    :activator="selectedElement"
    offset-x
  >
    <v-card
      color="teal"
      flat
    >
      <v-toolbar dark>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <p>
          <a :href="addressLink" target="_blank" class="AddressLink">
            <b class="tw-underline">{{ $t('text.address') }}:</b>
            <v-btn icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            {{ selectedEvent.name }}
          </a>
        </p>
        <p>
          <b class="tw-underline">{{ $t('text.time') }}:</b>
          <v-btn icon>
            <v-icon>mdi-clock-outline</v-icon>
          </v-btn>
          {{ time }}
        </p>
        <p>
          <b class="tw-underline">{{ $t('text.players') + ' (' + $t('text.min') + '-' + $t('text.max') + ')' }}:</b>
          {{ playerRange }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="secondary"
          @click="closeCard"
        >
          {{ $t('text.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import moment from 'moment'
import DatetimeConstants from '@/constants/datetime.constants'
import GoogleMapsHelpers from '@/helpers/google.maps.helpers'

export default {
  name: 'CalendarEventCard',
  props: {
    selectedEvent: {
      type: Object,
      required: false
    },
    selectedElement: {
      required: false
    },
    selectedOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    time () {
      const start = moment(this.selectedEvent.start)
      const end = moment(this.selectedEvent.end)

      return start.format(DatetimeConstants.TimeFormat) + '-' + end.format(DatetimeConstants.TimeFormat)
    },
    playerRange () {
      return this.selectedEvent.minPlayers + '-' + this.selectedEvent.maxPlayers
    },
    addressLink () {
      return GoogleMapsHelpers.getWebMapUrl(this.selectedEvent.address)
    }
  },
  methods: {
    closeCard () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
a.AddressLink {
  &:active {
    color: white;
  }

  &:link {
    color: white;
  }

  &:visited {
    color: white;
  }

  &:hover {
    color: white;
  }

  &:active {
    color: white;
  }
}
</style>
