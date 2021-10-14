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
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="details.address"
                :rules="[rules.required]"
                :label="$t('text.address')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-subheader>{{ $t('component.createGameForm.label.playerRange') }}</v-subheader>
              <v-range-slider
                v-model="details.playersAmountRange"
                :max="max"
                :min="min"
                color="teal"
                track-color="teal lighten-4"
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="details.playersAmountRange[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="details.playersAmountRange[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-range-slider>
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
            <v-col cols="12" md="12">
              <v-btn
                color="teal"
                elevation="2"
                class="white--text"
                @click="this.submit">{{ $t('text.create') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { GameTypes } from '@/constants/game.constants'
import moment from 'moment'

export default {
  name: 'GameForm',
  props: {
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
    }
  },
  data: function () {
    return {
      valid: false,
      min: 1,
      max: 35,
      timePickerProps: {
        format: '24hr'
      },
      details: {
        type: GameTypes.Soccer,
        address: this.initialAddress,
        playersAmountRange: this.initialPlayerAmountRange,
        startDatetime: this.initialStartDatetime,
        endDatetime: this.initialEndDatetime
      },
      rules: {
        required: value => !!value || this.$i18n.t('errorMessage.required')
      },
      validation: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    submit () {
      this.resetValidation()

      this.$refs.form.validate()
      this.customValidation()

      if (this.valid) {
        this.$emit('send', this.details)
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
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>

</style>
