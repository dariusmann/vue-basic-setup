<template>
  <div>
    <v-subheader>{{ $t('component.createGameForm.label.playerRange') }}</v-subheader>
    <v-range-slider
      v-model="playersAmountRange"
      :max="max"
      :min="min"
      color="teal"
      track-color="teal lighten-4"
      hide-details
      class="align-center"
    >
      <template v-slot:prepend>
        <v-text-field
          :value="playersAmountRange[0]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
          :value="playersAmountRange[1]"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
export default {
  name: 'PlayersRange',
  initialPlayerAmountRange: {
    type: Array,
    default: () => [8, 16]
  },
  data: function () {
    return {
      min: 1,
      max: 35,
      playersAmountRange: this.initialPlayerAmountRange
    }
  }
}
</script>

<style scoped>

</style>
