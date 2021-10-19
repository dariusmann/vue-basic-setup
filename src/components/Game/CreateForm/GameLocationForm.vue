<template>
  <v-row>
    <v-col cols="12" md="2" sm="2">
      <v-checkbox
        v-model="location.shower"
        :label="$t('component.createGameForm.label.shower')"
        color="teal"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2">
      <v-checkbox
        v-model="location.parking"
        :label="$t('component.createGameForm.label.parking')"
        color="teal"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2">
      <v-checkbox
        v-model="location.dressingRoom"
        :label="$t('component.createGameForm.label.dressingRoom')"
        color="teal"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2">
      <v-checkbox
        v-model="location.locker"
        :label="$t('component.createGameForm.label.locker')"
        color="teal"
      />
    </v-col>
    <v-col cols="12" md="2" sm="2">
      <v-select
        v-model="location.fieldType"
        :items="fieldTypes"
        item-text="label"
        item-value="value"
        :label="$t('component.createGameForm.label.fieldType')"
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
</template>

<script>
import { GameFieldType } from '@/constants/game.constants'

export default {
  name: 'GameLocationForm',
  props: {},
  data: function () {
    return {
      location: {
        shower: false,
        parking: false,
        dressingRoom: false,
        locker: false,
        fieldType: null
      },
      rules: {
        required: value => !!value || this.$i18n.t('errorMessage.required')
      }
    }
  },
  watch: {
    location: {
      handler (locationDetails) {
        this.$emit('change', locationDetails)
      },
      deep: true
    }
  },
  computed: {
    fieldTypes () {
      return [
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.fieldType.inside'),
          value: GameFieldType.Inside
        },
        {
          label: this.$i18n.t('component.createGameForm.selectLabels.fieldType.outside'),
          value: GameFieldType.Outside
        },
        {
          label: this.$i18n.t('text.unknown'),
          value: GameFieldType.Unknown
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
