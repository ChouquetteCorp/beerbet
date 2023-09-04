<script setup lang="ts">
  import { useMatchStore } from '@/stores/match'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import { onMounted, ref } from 'vue'
  import { Sport } from '@/types/interfaces'
  import { FilterMatchMode } from 'primevue/api'
  import { APP_ROUTES } from '@/constants'

  const matchStore = useMatchStore()

  onMounted(async () => {
    await matchStore.getMatchs()
  })

  function formatSport(sport: Sport) {
    switch (sport) {
      case Sport.FOOTBALL:
        return '⚽'
      case Sport.BASKETBALL:
        return '🏀'
      case Sport.HANDBALL:
        return '🤾'
      case Sport.RUGBY:
        return '🏉'
      case Sport.TENNIS:
        return '🎾'
      case Sport.VOLLEYBALL:
        return '🏐'
    }
  }

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
</script>

<template>
  <DataTable
    v-model:filters="filters"
    striped-rows
    responsive-layout="stack"
    class="p-datatable-sm"
    row-group-mode="subheader"
    group-rows-by="day"
    state-storage="local"
    state-key="dt-state-match"
    filter-display="row"
    :value="matchStore.allMatchs"
    :global-filter-fields="['league', 'date', 'match', 'venue']"
    paginator
    :rows="50"
  >
    <template #header>
      <div class="flex justify-content-end">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <PInputText v-model="filters['global'].value" :placeholder="$t('MatchView.searchBar')" />
        </span>
      </div>
    </template>
    <Column field="day" />
    <Column field="sport">
      <template #body="{ data }">{{ formatSport(data.sport) }}</template>
    </Column>
    <Column :sortable="true" field="league" :header="$t('MatchView.tableHeader.league')"></Column>
    <Column field="match" :header="$t('MatchView.tableHeader.match')"></Column>
    <Column
      style="width: 5rem"
      filter-field="date"
      field="date"
      data-type="date"
      :header="$t('MatchView.tableHeader.date')"
    >
      <template #body="{ data }">{{ $d(data.date, 'time') }}</template>
    </Column>
    <Column field="venue" :header="$t('MatchView.tableHeader.venue')">
      <template #body="{ data }">
        <small style="display: block">
          {{ data.venue }}
        </small>
      </template>
    </Column>
    <Column field="city" :header="$t('MatchView.tableHeader.city')">
      <template #body="{ data }">
        <small style="display: block">
          {{ data.city }}
        </small>
      </template>
    </Column>
    <Column style="width: 4rem">
      <template #body="{ data }">
        <router-link :to="{ path: APP_ROUTES.CREATE, query: { matchId: data.id } }">
          {{ $t('MatchView.bet') }}
        </router-link>
      </template>
    </Column>
    <template #groupheader="{ data }">
      <span>{{ data.day }}</span>
    </template>
  </DataTable>
</template>
