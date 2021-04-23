<template>
  <dropdown-menu :items="items" v-model="state.selection"/>
</template>

<script lang="ts">
import {defineComponent, watch, reactive} from "vue";
import DropdownMenu from "./DropdownMenu.vue";
import {DropdownMenuItemData, Language} from "../types/Ui.interface";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "SearchTypePicker",
  components: {
    "dropdown-menu": DropdownMenu
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const i18n = useI18n({
      useScope: "global",
      messages: {
        en: {
          menuItem: {
            en_lbl: "English",
            fr_lbl: "French",
            de_lbl: "German",
          }
        },
        fr: {
          menuItem: {
            en_lbl: "Englais",
            fr_lbl: "Francais",
            de_lbl: "Allemand",
          }
        },
        de: {
          menuItem: {
            en_lbl: "Englisch",
            fr_lbl: "Französisch",
            de_lbl: "Deutsch",
          }
        }
      }
    });

    const items: Array<DropdownMenuItemData> = [
      {
        id: Language.English,
        index: 0
      },
      {
        id: Language.French,
        index: 1
      },
      {
        id: Language.German,
        index: 2
      }
    ];

    const state = reactive({
      selection: items.filter(item => item.id === i18n.locale.value)[0]
    })
    watch(() => state.selection, (newValue) => {
      i18n.locale.value = newValue.id;
      emit("update:modelValue", newValue.id)
    });

    return {
      items,
      state,
    }
  }
})
</script>

<style scoped>

</style>