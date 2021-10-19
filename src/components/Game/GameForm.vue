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
                :hint="$t('text.required')"
              ></v-text-field>
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
              <v-select
                v-model="details.format"
                :items="gameFormats"
                item-text="label"
                item-value="value"
                :label="$t('component.createGameForm.label.format')"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="details.level"
                :items="playerLevels"
                item-text="label"
                item-value="value"
                :label="$t('component.createGameForm.label.playerLevel')"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <VuePhoneNumberInput
                v-model="details.contact"
                default-country-code="UA"
                @update="changePhoneNumber"
                :error="!phoneNumber.isValid"
                :translations="phoneNumberTranslations"
                dark
              />
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
import { GameFormat, GameTypes, PlayerLevel } from '@/constants/game.constants'
import moment from 'moment'
import GameLocationForm from '@/components/Game/CreateForm/GameLocationForm'

export default {
  name: 'GameForm',
  components: { GameLocationForm },
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
      valid: false,
      min: 1,
      max: 35,
      timePickerProps: {
        format: '24hr'
      },
      phoneNumber: {
        isValid: false
      },
      phoneNumberTranslations: {
        phoneNumberLabel: this.$i18n.t('component.createGameForm.label.contact')
      },
      location: null,
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

      if (!this.phoneNumber.isValid) {
        this.valid = false
      }
    },
    resetValidation () {
      this.validation.show = false
      this.validation.message = ''
      this.$refs.form.resetValidation()
    },
    changeLocation (locationData) {
      this.location = locationData
    },
    changePhoneNumber (phoneNumber) {
      this.phoneNumber = phoneNumber
    }
  },
  computed: {
    gameFormats () {
      return [
        {
          label: GameFormat.Format4x4,
          value: GameFormat.Format4x4
        },
        {
          label: GameFormat.Format5x5,
          value: GameFormat.Format5x5
        },
        {
          label: GameFormat.Format5x5x5,
          value: GameFormat.Format5x5x5
        },
        {
          label: GameFormat.Format6x6,
          value: GameFormat.Format6x6
        },
        {
          label: GameFormat.Format6x6x6,
          value: GameFormat.Format6x6x6
        },
        {
          label: GameFormat.Format8x8,
          value: GameFormat.Format8x8
        },
        {
          label: GameFormat.Format11x11,
          value: GameFormat.Format11x11
        }
      ]
    },
    playerLevels () {
      return [
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.beginner'),
          value: PlayerLevel.Beginner
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.beginnerToMedium'),
          value: PlayerLevel.BeginnerToMedium
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.medium'),
          value: PlayerLevel.Medium
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.mediumToAdvanced'),
          value: PlayerLevel.MediumToAdvanced
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.advanced'),
          value: PlayerLevel.Advanced
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.playerLevel.professional'),
          value: PlayerLevel.Professional
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
