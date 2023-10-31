<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import type { Result } from '@/types/interfaces'
  import { useI18n } from 'vue-i18n'
  import UsernameLine from './UsernameLine.vue'

  const auth = useAuthStore()
  const { t } = useI18n()

  interface Props {
    result: Result
  }

  const props = defineProps<Props>()
</script>

<template>
  <p class="event-results-item">
    <template v-if="props.result.from.user_id === auth.userId">
      {{
        t('EventResultsItem.giveMessage', {
          count: props.result.number + ' ' + t('unit', Math.trunc(props.result.number)),
        })
      }}
      <UsernameLine v-if="result.to" :username="result.to.username" :old-usernames="result.to.old_usernames" />
    </template>
    <template v-else>
      <UsernameLine v-if="result.from" :username="result.from.username" :old-usernames="result.from.old_usernames" />
      {{
        t('EventResultsItem.getMessage', {
          count: props.result.number + ' ' + t('unit', Math.trunc(props.result.number)),
        })
      }}
    </template>
  </p>
</template>

<style lang="scss" scoped>
  .event-results-item {
    font-weight: 500;
  }
</style>
