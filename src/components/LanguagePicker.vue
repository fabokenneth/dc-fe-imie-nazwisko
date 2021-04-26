<template>
  <dropdown-menu v-model="state.selection" :items="items" :with-border="true" />
</template>

<script lang="ts">
  import { defineComponent, watch, reactive } from 'vue'
  import DropdownMenu from './DropdownMenu.vue'
  import { DropdownMenuItemData, Language } from '../types/Ui.interface'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'LanguagePicker',
    components: {
      'dropdown-menu': DropdownMenu,
    },
    setup: () => {
      const i18n = useI18n({
        useScope: 'global',
        messages: {
          en: {
            menuItem: {
              en_lbl: 'English',
              fr_lbl: 'Francais',
              de_lbl: 'Deutsch',
            },
          },
          fr: {
            menuItem: {
              en_lbl: 'English',
              fr_lbl: 'Francais',
              de_lbl: 'Deutsch',
            },
          },
          de: {
            menuItem: {
              en_lbl: 'English',
              fr_lbl: 'Francais',
              de_lbl: 'Deutsch',
            },
          },
        },
      })

      const items: Array<DropdownMenuItemData> = [
        {
          id: Language.English,
          index: 0,
        },
        {
          id: Language.French,
          index: 1,
        },
        {
          id: Language.German,
          index: 2,
        },
      ]

      const state = reactive({
        selection: items.filter((item) => item.id === i18n.locale.value)[0],
      })
      watch(
        () => state.selection,
        (newValue) => {
          i18n.locale.value = newValue.id
        }
      )

      return {
        items,
        state,
      }
    },
  })
</script>

<style scoped></style>
