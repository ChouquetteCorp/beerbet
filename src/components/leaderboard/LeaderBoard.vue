<script setup lang="ts">
  import { useLeaderboardStore } from '@/stores/leaderboard'
  import { onMounted } from 'vue'
  import UsernameLine from '../UsernameLine.vue'
  const leaderboardStore = useLeaderboardStore()

  onMounted(async () => {
    await leaderboardStore.setLeaderboard()
  })
</script>

<template>
  <div class="leaderboard">
    <h3>{{ $t('Leaderboard.title') }}</h3>
    <p v-if="leaderboardStore.leaderboard?.length === 0">{{ $t('Leaderboard.noResults') }}</p>
    <ol>
      <li v-for="line of leaderboardStore.leaderboard" :key="line.user_id">
        <UsernameLine :username="line.username" :old-usernames="line.old_usernames" class="leaderboard__username" />
        <small>{{ line.score }}</small>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
  .leaderboard {
    width: 100%;
    min-width: 18.75rem;
    h3 {
      padding: 0.75rem 0.8125rem 1.125rem;
    }

    ol {
      padding: 0;
      counter-reset: leaderboard;

      li {
        position: relative;
        list-style-type: none;
        font-size: 0.875rem;
        counter-increment: leaderboard;
        padding: 1.5rem 0.625rem 1.125rem 2.25rem;
        backface-visibility: hidden;
        transform: translateZ(0) scale(1, 1);
        display: inline-flex;
        width: 100%;

        &::before {
          content: counter(leaderboard);
          position: absolute;
          left: 0.9375rem;
          width: 1.25rem;
          height: 1.25rem;
          line-height: 1.25rem;
          font-weight: bold;
          color: var(--primary-color-text);
          background: #fff;
          border-radius: 1.25rem;
          text-align: center;
        }

        .leaderboard__username {
          width: 100%;
        }

        small {
          right: 1rem;
          bottom: calc(50% - 0.85rem);
          display: block;
          text-align: right;
          font-size: 0.85rem;
          font-weight: 500;
        }

        background: var(--surface-e);

        &:nth-child(1) {
          background: var(--surface-d);
          &::after {
            background: var(--surface-d);
          }
        }

        &:nth-child(2) {
          background: #2b3e58;
          &::after {
            background: #2b3e58;
            box-shadow: 0 0.125rem 0 rgba(0, 0, 0, 0.08);
          }

          & mark {
            &::before,
            &::after {
              bottom: -0.4375rem;
            }
          }
        }

        &:nth-child(3) {
          background: #26374e;
          &::after {
            background: #26374e;
            box-shadow: 0 0.0625rem 0 rgba(0, 0, 0, 0.11);
          }

          & mark {
            &::before,
            &::after {
              bottom: -0.1875rem;
            }
          }
        }
      }
      // hover
      li:hover {
        z-index: 3;
        opacity: 1;
        transform: scale(1.01);

        transition-duration: 0.3s;
      }
    }
  }
</style>
