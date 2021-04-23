<template>
  <div class="flex items-center justify-start rounded-md border-2 border-gray-300 w-96 h-10">
    <div class="flex items-center border-r-2 border-r-gray-300 h-full">
      <div class="searchBoxText justify-center w-24">
        {{ t("searchBy_lbl")}}
      </div>
    </div>
    <div class="w-36 border-r-2 border-r-gray-300 h-full">
      <search-type-picker v-model="state.searchType"/>
    </div>
    <div class="w-3/5">
      <search-text-input v-model="state.searchText"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from "vue";
import SearchTypePicker from "./SearchTypePicker.vue";
import SearchTextInput from "./SearchTextInput.vue";
import {SearchBy} from "../types/Ui.interface";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "SearchBlock",
  components: {
    "search-type-picker": SearchTypePicker,
    "search-text-input": SearchTextInput,
  },
  setup() {
    const i18n = useI18n({
      messages: {
        en: {
          searchBy_lbl: "Search By"
        },
        fr: {
          searchBy_lbl: "Rechercher Par"
        },
        de: {
          searchBy_lbl: "Suchen nach"
        }
      }
    })
    const state = reactive({
      searchType: SearchBy.Name,
      searchText: ""
    });

    return {
      t: i18n.t,
      state
    }
  }
})
</script>

<style scoped>

</style>