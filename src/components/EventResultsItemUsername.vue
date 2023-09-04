<script lang="ts" setup>
  import { ref, computed } from 'vue'

  interface Props {
    oldUsernames: string[]
    username: string
  }

  const props = defineProps<Props>()

  function formatMailName(name: string) {
    // example: jean-cedric.delatour => Jean-Cedric Delatour
    if (!/^([a-z-])+.([a-z-])+$/g.test(name)) {
      return name
    }
    return name
      .replace('.', ' ')
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
      .replace(/-[a-z]/g, (match) => match.toUpperCase())
  }

  const showTooltip = ref(false)

  const hasOldUsernames = computed(() => props.oldUsernames.length > 0)
</script>

<template>
  <span @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
    <strong
      class="item-username__username"
      :class="{ 'item-username__username--are-old-usernames': hasOldUsernames }"
    >
      {{ formatMailName(props.username) }}
    </strong>
    <transition name="fade">
      <span v-if="showTooltip && hasOldUsernames" class="p-tooltip p-tooltip-right item-username__tooltip">
        <div class="p-tooltip-arrow" />
        <div class="p-tooltip-text">
          <ul>
            <li class="p-tooltip-text__title">{{ $t('EventResultsItemUsername.oldUsernames') }}</li>
            <li v-for="(oldUsername, i) in props.oldUsernames" :key="`username${i}`">
              {{ formatMailName(oldUsername) }}
            </li>
          </ul>
        </div>
      </span>
    </transition>
  </span>
</template>

<style lang="scss" scoped>
  .item-username {
    &__username {
      font-weight: 700;
      text-underline-offset: 0.25rem;
      &--are-old-usernames {
        cursor: pointer;
        text-decoration: underline dotted;
      }
    }
    &__tooltip {
      display: inline-block;
      min-width: 6rem;
      padding-right: 0;
      height: max-content;
      .p-tooltip-text {
        width: 100%;
        max-height: 15rem;
        overflow-y: auto;
        transform: rotateX(180deg);
        &__title {
          font-size: 0.85rem;
          text-decoration: underline;
        }
        ul {
          list-style: none;
          text-indent: 0;
          padding: 0;
          transform: rotateX(180deg);
          text-overflow: ellipsis;
        }
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          background: var(--surface-0);
        }
        &::-webkit-scrollbar-thumb {
          background: var(--gray-800);
        }
      }
      .p-tooltip-arrow {
        top: 0.7rem;
      }
    }
  }
</style>
