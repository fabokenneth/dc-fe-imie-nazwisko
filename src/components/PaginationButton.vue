<template>
  <div
      class="w-10 h-10 rounded border flex items-center justify-center mx-1"
      :class="{isSelected: isSelected && !isThreeDots, isNotSelected: !isSelected, isThreeDots: isThreeDots }"
      @click="onClicked"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, nextTick} from "vue";

export default defineComponent({
  name: "PaginationButton",
  props: {
    isSelected: {
      type: Boolean,
      default: false
    },
    isThreeDots: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    execute: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const onClicked = () => {
      if (props.isActive) {
        nextTick(() => props.execute());
      }
    }
    return {
      onClicked
    }
  }
})
</script>

<style scoped>
.isSelected {
  @apply border-colliersCyan-400 text-white bg-colliersCyan-400;
}
.isNotSelected {
  @apply border-colliersGray-400 text-colliersGray-400 bg-white cursor-pointer;
}
.isThreeDots {
  @apply border-colliersGray-400 text-colliersGray-400 bg-white;
}

</style>