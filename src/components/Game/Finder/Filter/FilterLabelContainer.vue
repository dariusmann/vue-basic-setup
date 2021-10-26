<template>
  <div>
    <v-chip v-for="(format, key) in getGameFormats"
            :key="key"
            :value="format"
            color="teal"
            class="tw-mr-1 tw-mb-1"
            close
            @click:close="removeFilterFormat(format)"
    >{{ resolveGameFormatLabel(format) }}
    </v-chip>
    <v-chip v-for="(level, key) in getPlayerLevels"
            :key="key"
            :value="level"
            color="teal"
            class="tw-mr-1 tw-mb-1"
            close
            @click:close="removeFilterLevel(level)"
    >{{ resolvePlayerLevelLabel(level) }}
    </v-chip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GameFormatLabels, PLayerLevelLabels } from '@/constants/game.constants'

export default {
  name: 'FilterLabelContainer',
  computed: {
    ...mapGetters('filter', {
      getGameFormats: 'getGameFormats',
      getPlayerLevels: 'getPlayerLevels'
    })
  },
  methods: {
    async removeFilterFormat (format) {
      await this.$store.dispatch('filter/removeGameFormats', { gameFormat: format })
      this.$emit('removed')
    },
    async removeFilterLevel (level) {
      await this.$store.dispatch('filter/removePlayerLevels', { playerLevel: level })
      this.$emit('removed')
    },
    resolveGameFormatLabel (gameFormatKey) {
      for (const key in GameFormatLabels) {
        if (GameFormatLabels[key].value === gameFormatKey) {
          return GameFormatLabels[key].label
        }
      }
    },
    resolvePlayerLevelLabel (playerLevelKey) {
      for (const key in PLayerLevelLabels) {
        if (PLayerLevelLabels[key].value === playerLevelKey) {
          return PLayerLevelLabels[key].label
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
