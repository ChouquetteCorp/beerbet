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
    <ol>
      <li v-for="line of leaderboardStore.leaderboard" :key="line.user_id">
        <mark><UsernameLine :username="line.username" :old-usernames="line.old_usernames" /></mark>
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
        list-style-type: none;
        position: relative;
        z-index: 1;
        font-size: 0.875rem;
        counter-increment: leaderboard;
        padding: 1.5rem 0.625rem 1.125rem 3.125rem;
        backface-visibility: hidden;
        transform: translateZ(0) scale(1, 1);

        &::before {
          content: counter(leaderboard);
          position: absolute;
          z-index: 2;
          top: 0.9375rem;
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

        mark {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 1.125rem 0.625rem 1.125rem 1.2rem;
          margin: 0;
          background: none;
          color: var(--text-color);

          &::before,
          &::after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: -0.6875rem;
            left: -0.5625rem;
            border-left: 0.625rem solid transparent;
            transition: all 0.1s ease-in-out;
            opacity: 0;
          }

          &::after {
            left: auto;
            right: -0.5625rem;
            border-left: none;
            border-right: 0.625rem solid transparent;
          }
        }

        small {
          position: relative;
          z-index: 2;
          display: block;
          text-align: right;
          font-size: 0.85rem;
          font-weight: 500;
        }

        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--surface-e);
          box-shadow: 0 0.1875rem 0 rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease-in-out;
          opacity: 0;
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
        opacity: 1;
        transform: scale(1.01);

        transition-duration: 0.3s;
      }
    }
  }
</style>
