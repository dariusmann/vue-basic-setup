<template>
  <VuePhoneNumberInput
    v-model="contact"
    default-country-code="UA"
    @update="changePhoneNumber"
    :error="!inputPayload.isValid"
    :translations="phoneNumberTranslations"
    dark
  />
</template>

<script>
export default {
  name: 'PhoneNumberInput',
  data: function () {
    return {
      contact: null,
      inputPayload: {
        isValid: false
      },
      phoneNumberTranslations: {
        phoneNumberLabel: this.$i18n.t('component.createGameForm.label.contact')
      }
    }
  },
  methods: {
    changePhoneNumber (payload) {
      this.inputPayload = payload
    }
  }
}
</script>

<style scoped>

</style>
