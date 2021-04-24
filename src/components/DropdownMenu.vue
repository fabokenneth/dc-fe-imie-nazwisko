<template>
  <hui-menu as="div" class="relative flex flex-col h-full w-full">
    <hui-menu-button
      class="flex items-center justify-between w-full px-4 bg-white text-sm font-medium focus:outline-none cursor-pointer"
      :class="
        withBorder
          ? 'border border-colliersGray-400 h-14 top-12 rounded-md'
          : 'h-full'
      "
    >
      <span class="searchBoxText">
        {{ t('menuItem.' + selectedItem.id + '_lbl') }}
      </span>
      <svg
        class="w-4 h-4 ml-2 -mr-1 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </hui-menu-button>
    <hui-menu-items
      class="flex flex-col absolute cursor-pointer w-full bg-white rounded-b-xl border-l border-r border-b border-colliersGray-400"
      :class="withBorder ? 'top-12 -mt-1' : 'top-16 -mt-3'"
    >
      <hui-menu-item
        v-for="(itemData, index) in menuItemsData"
        :key="itemData.index"
        v-slot="{ active }"
        class="menuItem"
        :class="index > -1 ? 'border-t border-colliersGray-400' : ''"
        @click="onItemSelected(itemData)"
      >
        <div
          :class="active ? 'bg-colliersCyan-400 text-white' : 'text-gray-700'"
        >
          {{ t('menuItem.' + itemData.id + '_lbl') }}
        </div>
      </hui-menu-item>
    </hui-menu-items>
  </hui-menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { DropdownMenuItemData } from '../types/Ui.interface'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'DropdownMenu',
    components: {
      'hui-menu': Menu,
      'hui-menu-button': MenuButton,
      'hui-menu-items': MenuItems,
      'hui-menu-item': MenuItem,
    },
    props: {
      modelValue: {
        type: Object as PropType<DropdownMenuItemData>,
        default: null,
      },
      items: {
        type: Array as PropType<DropdownMenuItemData[]>,
        required: true,
        default: () => new Array<DropdownMenuItemData>(),
      },
      withBorder: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const i18n = useI18n({
        useScope: 'global',
      })
      const selectedItem = ref(props.modelValue)

      const menuItemsData = computed((): DropdownMenuItemData[] => {
        const clonedItems = [...props.items]
        return clonedItems.sort((a, b) => a.index - b.index)
      })
      const onItemSelected = (item: DropdownMenuItemData): void => {
        selectedItem.value = item
        emit('update:modelValue', item)
      }

      return {
        t: i18n.t,
        selectedItem,
        menuItemsData,
        onItemSelected,
      }
    },
  })
</script>

<style scoped>
  .menuItem {
    @apply group flex items-center px-4 h-12 text-sm;
  }
</style>
