<template>
  <div class="flex items-center rounded-r-md w-56 ring-1 ring-gray-300 focus:outline-none justify-between
  focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-colliers-400">
    <input type="search" class="w-4/5 border-0 p-1 focus:outline-none"
    v-model="state.searchText">
    <div class="mt-2 mr-2 text-colliers-400">
      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, watch} from "vue";

export default defineComponent({
  name: "SearchTextInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    }
  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const state = reactive({
      isActive: false,
      searchText: props.modelValue
    })
    watch(() => state.searchText, newValue =>  emit("update:modelValue", newValue))
    return {
      state
    }
  }
})
</script>

<style scoped>

</style>