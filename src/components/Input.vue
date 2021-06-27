<template>
  <input
    :type="type"
    class="
      focus:outline-none
      focus:shadow
      px-3
      py-2
      border border-gray-800
      rounded
    "
    :placeholder="placeholder"
    :value="modelValue"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      required: true,
      type: String
    },
    type: {
      default: 'text',
      type: String
    },
    placeholder: {
      default: '',
      type: String
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
