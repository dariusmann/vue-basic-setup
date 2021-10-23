<template>
  <v-select
    class="LanguageSelection"
    v-model="select"
    :items="items"
    item-text="flagCode"
    item-value="isoCode"
    :label="null"
    @change="change"
    return-object
  >
    <template v-slot:selection="{ item }">
      <country-flag :country='item.flagCode' size='normal'/>
    </template>
    <template v-slot:item="{ item }">
      <country-flag :country='item.flagCode' size='normal'/> <span>{{item.flagCode}}</span>
    </template>
  </v-select>
</template>

<script>
import { IsoCodeMappingFlagCode, LanguageCodes } from '@/constants/lang.constants'

export default {
  name: 'LanguageSelection',
  props: {
    defaultSelect: {
      type: Object
    }
  },
  data: function () {
    return {
      items: [
        {
          flagCode: IsoCodeMappingFlagCode[LanguageCodes.Ukrainian],
          isoCode: LanguageCodes.Ukrainian
        }, {
          flagCode: IsoCodeMappingFlagCode[LanguageCodes.Russian],
          isoCode: LanguageCodes.Russian
        }, {
          flagCode: IsoCodeMappingFlagCode[LanguageCodes.English],
          isoCode: LanguageCodes.English
        }
      ],
      select: this.defaultSelect
    }
  },
  methods: {
    async change (value) {
      await this.$store.dispatch('lang/updateLanguageCode', { code: value.isoCode })
    }
  }
}
</script>

<style scoped>

</style>
