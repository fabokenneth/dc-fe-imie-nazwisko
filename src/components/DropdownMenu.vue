<template>
  <hui-menu as="div" class="relative flex flex-col">
    <hui-menu-button
      class="flex items-center justify-between w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-colliers-400 cursor-pointer"
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
      class="flex flex-col absolute top-9 cursor-pointer w-28 bg-white rounded-b-xl border-l-2 border-r-2 border-b-2 border-gray-300"
    >
      <hui-menu-item
        v-for="(itemData, index) in menuItemsData"
        :key="itemData.index"
        v-slot="{ active }"
        class="menuItem"
        :class="index > -1 ? 'border-t-2 border-gray-300' : ''"
        @click="onItemSelected(itemData)"
      >
        <div :class="active ? 'bg-colliers-400 text-white' : 'text-gray-700'">
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
    @apply group flex items-center px-4 py-2 text-sm;
  }
</style>
