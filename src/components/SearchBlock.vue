<template>
  <div
    class="flex items-center justify-start rounded-md border border-colliersGray-400 w-96 h-14"
  >
    <div class="flex items-center h-full">
      <div class="searchBoxText justify-center w-24">
        {{ t('searchBy_lbl') }}
      </div>
    </div>
    <div class="w-40 border-l border-r border-colliersGray-400 h-full">
      <search-type-picker
        v-model="state.searchType"
        data-test-id="search-criteria"
      />
    </div>
    <div class="w-3/5">
      <search-text-input v-model="state.searchText" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, PropType } from 'vue'
  import SearchTypePicker from './SearchTypePicker.vue'
  import SearchTextInput from './SearchTextInput.vue'
  import { SearchBy } from '../types/Ui.interface'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'SearchBlock',
    components: {
      'search-type-picker': SearchTypePicker,
      'search-text-input': SearchTextInput,
    },
    props: {
      searchText: {
        type: String,
        required: true,
      },
      searchType: {
        type: String as PropType<SearchBy>,
        required: true,
      },
    },
    emits: ['update:searchText', 'update:searchType'],
    setup(props, { emit }) {
      const i18n = useI18n({
        messages: {
          en: {
            searchBy_lbl: 'Search By',
          },
          fr: {
            searchBy_lbl: 'Rechercher Par',
          },
          de: {
            searchBy_lbl: 'Suchen nach',
          },
        },
      })
      const state = reactive({
        searchType: props.searchType,
        searchText: props.searchText,
      })

      watch(
        () => state.searchText,
        (newValue) => emit('update:searchText', newValue)
      )
      watch(
        () => state.searchType,
        (newValue) => emit('update:searchType', newValue)
      )

      return {
        t: i18n.t,
        state,
      }
    },
  })
</script>

<style scoped></style>
