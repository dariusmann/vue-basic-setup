<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert
          v-show="validation.show"
          dense
          outlined
          prominent
          text
          type="error"
        >
          <div>{{ validation.message }}!</div>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <validation-observer
        ref="observer"
        :v-slot="{valid}"
      >
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12" md="12">
              <validation-provider
                v-slot="{errors}"
                :name="$t('text.address')"
                rules="required"
              >
                <v-text-field
                  v-model="details.address"
                  :label="$t('text.address')"
                  :hint="$t('text.required')"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <v-datetime-picker
                :label="$t('component.createGameForm.label.startDatetime')"
                v-model="details.startDatetime"
                :time-picker-props="timePickerProps"/>
            </v-col>
            <v-col cols="12" md="6">
              <v-datetime-picker
                :label="$t('component.createGameForm.label.endDatetime')"
                v-model="details.endDatetime"
                :time-picker-props="timePickerProps"/>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{errors}"
                :name="$t('component.createGameForm.label.format')"
                rules="required"
              >
                <v-select
                  v-model="details.format"
                  :items="gameFormats"
                  item-text="label"
                  item-value="value"
                  :error-messages="errors"
                  :label="$t('component.createGameForm.label.format')"
                  :hint="$t('text.required')"
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{errors}"
                :name="$t('component.createGameForm.label.playerLevel')"
                rules="required"
              >
                <v-select
                  v-model="details.level"
                  :items="playerLevels"
                  item-text="label"
                  item-value="value"
                  :label="$t('component.createGameForm.label.playerLevel')"
                  :error-messages="errors"
                  :hint="$t('text.required')"
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider
                v-slot="{errors}"
                :name="$t('text.contact')"
                rules="required"
              >
                <v-text-field
                  v-model="details.contact"
                  :label="$t('component.createGameForm.label.contact')"
                  :hint="$t('text.required')"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-row>
              <v-col cols="12" md="12">
                <GameLocationForm @change="changeLocation"/>
              </v-col>
            </v-row>
            <v-col cols="12" md="6">
              <v-textarea
                v-model="details.comment"
                :label="$t('component.createGameForm.label.comment')"
                :hint="$t('component.createGameForm.hint.comment')"/>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn
                color="teal"
                elevation="2"
                class="white--text"
                :loading="this.loading"
                type="submit">{{ $t('text.create') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-row>
  </v-container>
</template>

<script>
import { GameFormatLabels, GameTypes, PLayerLevelLabels } from '@/constants/game.constants'
import moment from 'moment'
import GameLocationForm from '@/components/Game/CreateForm/GameLocationForm'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import i18n from '@/plugins/i18n'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: i18n.t('text.required')
})

export default {
  name: 'GameForm',
  components: {
    GameLocationForm,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    initialAddress: {
      type: String,
      default: ''
    },
    initialPlayerAmountRange: {
      type: Array,
      default: () => [8, 16]
    },
    initialStartDatetime: {
      type: Date,
      default: null
    },
    initialEndDatetime: {
      type: Date,
      default: null
    },
    initialFormat: {
      type: Object,
      default: null
    },
    initialLevel: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      details: {
        type: GameTypes.Soccer,
        address: this.initialAddress,
        playersAmountRange: this.initialPlayerAmountRange,
        startDatetime: this.initialStartDatetime,
        endDatetime: this.initialEndDatetime,
        format: this.initialFormat,
        level: this.initialLevel,
        contact: null,
        comment: null
      },
      location: {
        shower: null,
        parking: null,
        dressingRoom: null,
        locker: null,
        fieldType: null
      },
      valid: false,
      errors: [],
      min: 1,
      max: 35,
      timePickerProps: {
        format: '24hr'
      },
      validation: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      this.resetValidation()

      this.valid = await this.$refs.observer.validate()
      this.customValidation()

      if (this.valid) {
        const data = {
          details: this.details,
          location: this.location
        }
        this.$emit('send', data)
      } else {
        window.scrollTo(0, 0)
      }
    },
    customValidation () {
      if (!this.details.startDatetime) {
        this.validation.show = true
        this.valid = false
        this.validation.message = this.$i18n.t('component.createGameForm.validationMessage.startDatetimeRequired')
        return
      }

      if (!this.details.endDatetime) {
        this.validation.show = true
        this.valid = false
        this.validation.message = this.$i18n.t('component.createGameForm.validationMessage.endDatetimeRequired')
        return
      }

      const startDatetime = moment(this.details.startDatetime)
      const endDatetime = moment(this.details.endDatetime)

      if (endDatetime.isBefore(startDatetime) || endDatetime === startDatetime) {
        this.validation.show = true
        this.valid = false
        this.validation.message = this.$i18n.t('component.createGameForm.validationMessage.startBeforeEndDateTime')
      }
    },
    resetValidation () {
      this.validation.show = false
      this.validation.message = ''
    },
    changeLocation (locationData) {
      this.location = locationData
    }
  },
  computed: {
    gameFormats () {
      return GameFormatLabels
    },
    playerLevels () {
      return PLayerLevelLabels
    }
  }
}
</script>

<style scoped>

</style>
