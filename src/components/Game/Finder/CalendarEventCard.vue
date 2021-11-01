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
        <v-toolbar-title v-html="eventName"></v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p>
          <a :href="addressLink" target="_blank" class="AddressLink">
            <v-btn icon>
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <b class="tw-underline">{{ $t('text.address') }}:</b>
            {{ selectedEvent.address }}
          </a>
        </p>
        <p>
          <v-btn icon>
            <v-icon>mdi-forum</v-icon>
          </v-btn>
          <b class="tw-underline">{{ $t('text.telegram') }}:</b>
          <a :href="telegramLink" class="AddressLink" target="_blank"> @{{contact}}</a>
        </p>
        <p>
          <v-btn icon>
            <v-icon>mdi-clock-outline</v-icon>
          </v-btn>
          <b class="tw-underline">{{ $t('text.time') }}:</b>
          {{ time }}
        </p>
        <p>
          <b class="tw-underline">{{ $t('text.format') }}:</b>
          {{format}}
        </p>
        <p>
          <b class="tw-underline">{{ $t('text.playerLevel') }}:</b>
          {{playerLevel}}
        </p>
        <p v-show="comment">
          <b class="tw-underline">{{ $t('text.comment') }}:</b>
          {{comment}}
        </p>
        <p>
          <b class="tw-underline">{{ $t('text.fieldType') }}:</b>
          {{fieldType}}
        </p>
        <div>
          <v-chip
            class="ma-2"
            color="pink"
            label
            text-color="white"
            v-show="hasShower"
          >
            <v-icon left>
              mdi-shower-head
            </v-icon>
            {{$t('text.shower')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="blue"
            label
            text-color="white"
            v-show="hasParking"
          >
            <v-icon left>
              mdi-parking
            </v-icon>
            {{$t('text.parking')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="orange"
            label
            text-color="white"
            v-show="hasDressingRoom"
          >
            <v-icon left>
              mdi-hanger
            </v-icon>
            {{$t('text.dressingRoom')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="red"
            label
            text-color="white"
            v-show="hasLocker"
          >
            <v-icon left>
              mdi-locker
            </v-icon>
            {{$t('text.locker')}}
          </v-chip>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
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
import { GameFieldTypeLabels, PLayerLevelLabels } from '@/constants/game.constants'
import TelegramHelper from '@/helpers/telegram.helpers'

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
    eventName () {
      return this.selectedEvent.format + ' ' + this.selectedEvent.address
    },
    time () {
      const start = moment(this.selectedEvent.start)
      const end = moment(this.selectedEvent.end)

      return start.format(DatetimeConstants.TimeFormat) + '-' + end.format(DatetimeConstants.TimeFormat)
    },
    addressLink () {
      return GoogleMapsHelpers.getWebMapUrl(this.selectedEvent.address)
    },
    format () {
      return this.selectedEvent.format
    },
    playerLevel () {
      return this.resolvePlayerLevelLabel(this.selectedEvent.playerLevel)
    },
    telegramLink () {
      return TelegramHelper.getTelegramLink(this.selectedEvent.contact)
    },
    fieldType () {
      return this.resolveFieldTypeLabel(this.selectedEvent.fieldType)
    },
    comment () {
      return this.selectedEvent.comment
    },
    contact () {
      return this.selectedEvent.contact
    },
    hasShower () {
      return this.selectedEvent.shower
    },
    hasParking () {
      return this.selectedEvent.parking
    },
    hasDressingRoom () {
      return this.selectedEvent.dressingRoom
    },
    hasLocker () {
      return this.selectedEvent.locker
    }
  },
  methods: {
    closeCard () {
      this.$emit('close')
    },
    resolvePlayerLevelLabel (playerLevelKey) {
      for (const key in PLayerLevelLabels) {
        if (PLayerLevelLabels[key].value === playerLevelKey) {
          return PLayerLevelLabels[key].label
        }
      }
    },
    resolveFieldTypeLabel (fieldType) {
      for (const key in GameFieldTypeLabels) {
        if (GameFieldTypeLabels[key].value === fieldType) {
          return GameFieldTypeLabels[key].label
        }
      }
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
