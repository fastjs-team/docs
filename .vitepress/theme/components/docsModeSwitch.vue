<script>
import VPSwitch from "vitepress/dist/client/theme-default/components/VPSwitch.vue"
import VPSidebarItem from "vitepress/dist/client/theme-default/components/VPSidebarItem.vue"

export default {
  name: "docs-mode-switch",
  components: {
    VPSwitch,
    VPSidebarItem
  },
  data() {
    return {
      enable: true
    }
  },
  methods: {
    changeMode() {
      this.enable = !this.enable
      this.$emit('changeMode', this.enable)
    }
  },
  emits: ['changeMode']
}
</script>

<template>
    <div class="docs-mode-switch" :data-advanced="enable">
      <span class="option-text" :class="{active: !enable}">Easy</span>
      <VPSwitch class="modeSwitch" :aria-checked="enable" @click="changeMode">
      </VPSwitch>
      <span class="option-text" :class="{active: enable}">Advanced</span>
    </div>
    <div class="docs-mode-switch-divider"></div>
</template>

<style lang="less" scoped>
.docs-mode-switch {
  display: flex;
  align-items: center;
  padding: 16px 0;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 8px 0;

  .option-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    margin: 0 8px;
    transition: color 0.25s !important;

    &.active {
      color: var(--vp-c-brand-2);
    }
  }
}

.docs-mode-switch-divider {
  height: 1px;
  background: var(--vp-c-divider);
  width: 100%;
}

.modeSwitch[aria-checked="true"] :deep(.check) {
  transform: translateX(18px);
}

.modeSwitch {
  border: 1px solid var(--vp-c-brand-2);

  :deep(.check) {
    background: var(--vp-c-brand-2) !important;
  }
}
</style>