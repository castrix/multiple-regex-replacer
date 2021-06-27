<template>
  <div
    class="
      px-3
      py-2
      rounded
      bg-gray-800
      text-white
      hover:shadow
      focus:shadow-none
      cursor-pointer
    "
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style module>
.re {
  font-weight: bold;
}
</style>
