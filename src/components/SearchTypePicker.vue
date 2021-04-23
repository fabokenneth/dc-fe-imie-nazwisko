<template>
  <dropdown-menu :items="items" v-model="state.selection"/>
</template>

<script lang="ts">
import {defineComponent, watch, reactive, PropType} from "vue";
import DropdownMenu from "./DropdownMenu.vue";
import {DropdownMenuItemData, SearchBy} from "../types/Ui.interface";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "SearchTypePicker",
  components: {
    "dropdown-menu": DropdownMenu
  },
  props: {
    modelValue: {
      type: String as PropType<SearchBy>,
    }
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    useI18n({
      useScope: "global",
      messages: {
        en: {
          menuItem: {
            name_lbl: "Name",
            identifier_lbl: "Identifier",
            episode_lbl: "Episode",
          }
        },
        fr: {
          menuItem: {
            name_lbl: "Nom",
            identifier_lbl: "Identifiant",
            episode_lbl: "Épisode",
          }
        },
        de: {
          menuItem: {
            name_lbl: "Name",
            identifier_lbl: "Kennung",
            episode_lbl: "Folge",
          }
        }
      }
    });

    const items: Array<DropdownMenuItemData> = [
      {
        id: SearchBy.Name,
        index: 0
      },
      {
        id: SearchBy.Identifier,
        index: 1
      },
      {
        id: SearchBy.Episode,
        index: 2
      }
    ];

    const state = reactive({
      selection: items.filter(item => item.id === props.modelValue)[0]
    })
    watch(() => state.selection, (newValue) => emit("update:modelValue", newValue.id));

    return {
      items,
      state,
    }
  }
})
</script>

<style scoped>

</style>