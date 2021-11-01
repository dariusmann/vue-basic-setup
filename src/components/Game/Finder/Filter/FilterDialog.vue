<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        color="primary"
        dark
        size="34px"
        v-bind="attrs"
        v-on="on"
      >
        mdi-filter
      </v-icon>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('text.filter') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-subheader>{{ $t('text.gameFormat') }}</v-subheader>
      <v-chip-group
        :value="getGameFormats"
        column
        multiple
        @change="selectedGameFormats"
      >
        <v-chip
          v-for="format in gameFormats"
          :key="format.value"
          :value="format.value"
          filter
        >
          {{ format.label }}
        </v-chip>
      </v-chip-group>
      <v-divider></v-divider>
      <v-subheader>{{ $t('text.playerLevel') }}</v-subheader>
      <v-chip-group
        column
        multiple
        :value="getPlayerLevels"
        @change="selectedPlayerLevels"
      >
        <v-chip
          v-for="level in playerLevels"
          :key="level.value"
          :value="level.value"
          filter
        >
          {{ level.label }}
        </v-chip>
      </v-chip-group>
    </v-card>
  </v-dialog>
</template>

<script>
import { GameFormatLabels, PLayerLevelLabels } from '@/constants/game.constants'
import { mapGetters } from 'vuex'

export default {
  name: 'FilterDialog',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async selectedGameFormats (formats) {
      await this.$store.dispatch('filter/updateGameFormats', { gameFormats: formats })
      this.$emit('change')
    },
    async selectedPlayerLevels (levels) {
      await this.$store.dispatch('filter/updatePlayerLevels', { playerLevels: levels })
      this.$emit('change')
    }
  },
  computed: {
    ...mapGetters('filter', {
      getGameFormats: 'getGameFormats',
      getPlayerLevels: 'getPlayerLevels'
    }),
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
