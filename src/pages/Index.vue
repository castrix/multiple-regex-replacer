<template>
  <div class="flex flex-col gap-2 w-full justify-center items-center">
    <HelloWorld class="font-bold" msg="Multiple Regex Replacer" />
    <HelloWorld class="font-bold" msg="With Vue 3.0 + Vite + Tailwind" />
    <HelloWorld
      class="font-bold"
      msg="Purpose: to help replacing multiple regex patterns, such as API response to Typescript interface"
    />
    <hr class="border border-gray-500 w-full" />
    <div class="w-1/2 gap-3 flex flex-col">
      <h1 class="text-left font-semibold">Input:</h1>
      <textarea
        class="
          focus:outline-none
          focus:shadow
          p-1
          border border-gray-800
          rounded
          h-24
        "
        :value="InputText"
        placeholder="input"
        @input="e => setInputText(e.target.value)"
      />
      <div
        class="
          text-left
          font-semibold
          flex flex-row
          gap-2
          justify-start
          items-center
        "
      >
        Patterns (*automatically flagged with
        <span class="text-green-600">/pattern/gm</span> or
        <span class="text-green-600">multiline</span> ):
        <Button text="Example" @click="setExample" />
      </div>
      <div class="grid grid-cols-3 gap-2">
        <template
          v-for="(pattern, index) of patterns"
          :key="`pattern-${index}`"
        >
          <Input
            :modelValue="pattern.pattern"
            placeholder="Input regex pattern"
            @input="e => setPattern({ index, value: e.target.value })"
          />
          <Input
            :modelValue="pattern.replace"
            placeholder="replace pattern"
            @input="e => setReplace({ index, value: e.target.value })"
          />
          <div v-if="index !== patterns.length - 1">
            <Button
              text="-"
              class="w-1/2 bg-red-600"
              @click="() => removePattern(index)"
            />
          </div>
        </template>
        <Button text="Add Pattern" class="bg-blue-800" @click="addPattern" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <Button
          text="Execute"
          :class="`${patterns.length < 2 ? 'col-span-2' : ''} bg-green-600`"
          @click="execute"
        />
        <Button
          v-if="patterns.length > 1"
          class="bg-red-600"
          text="Reset"
          @click="resetState"
        />
      </div>
      <h1 class="text-left font-semibold">Result:</h1>
      <textarea
        class="
          focus:outline-none
          focus:shadow
          p-1
          border border-gray-800
          rounded
          h-24
        "
        :value="result"
        placeholder="output"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import Input from '/@/components/Input.vue'
import Button from '/@/components/Button.vue'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'Index',
  components: {
    HelloWorld,
    Input,
    Button
  },
  setup() {
    const store = useStore()
    const patterns = computed(() => store.state.patterns)
    const result = computed(() => store.state.result)
    const InputText = computed(() => store.state.InputText)
    const {
      addPattern,
      setPattern,
      setResult,
      setExample,
      removePattern,
      setReplace,
      setInputText,
      resetState
    } = store.commit
    const execute = () =>
      patterns.value.map((item, index) => {
        const regex = new RegExp(item.pattern, 'gm')
        if (index > 0) {
          setResult(result.value.replace(regex, item.replace))
        } else {
          setResult(InputText.value.replace(regex, item.replace))
        }
      })
    return {
      patterns,
      addPattern,
      setPattern,
      setExample,
      removePattern,
      setReplace,
      execute,
      resetState,
      result,
      setInputText,
      InputText
    }
  }
})
</script>
