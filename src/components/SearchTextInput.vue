<template>
  <div class="flex items-center rounded-r-md w-full justify-between">
    <input
      v-model="state.searchText"
      type="search"
      class="w-4/5 border-0 p-1 focus:outline-none"
      data-test-id="search-field"
      @keyup.enter="onSubmit"
    />
    <div
      class="mt-2 mr-2 text-colliersCyan-400 cursor-pointer"
      @click="onSubmit"
    >
      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, PropType, reactive, watch } from 'vue'

  export default defineComponent({
    name: 'SearchTextInput',
    props: {
      modelValue: {
        type: String,
        required: true,
      },
      execute: {
        type: Function as PropType<() => void>,
        default: () => {},
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const state = reactive({
        isSelected: false,
        searchText: props.modelValue,
      })
      watch(
        () => state.searchText,
        (newValue) => emit('update:modelValue', newValue)
      )

      const onSubmit = () => {
        nextTick(() => props.execute())
      }
      return {
        state,
        onSubmit,
      }
    },
  })
</script>

<style scoped></style>
