<template>
  <CrystalLayout v-model:currentComponent="currentComponent">
    <component :is="currentComponent" />
  </CrystalLayout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CrystalLayout from './components/Layout.vue'
import Component1 from './components/Component1.vue'
import Component2 from './components/Component2.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    CrystalLayout,
    Component1,
    Component2
  },
  setup() {
    const currentComponent = ref('Component1')

    return {
      currentComponent
    }
  }
})
</script>