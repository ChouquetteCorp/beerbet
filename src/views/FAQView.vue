<script setup lang="ts">
  import Panel from 'primevue/panel'
  import Fieldset from 'primevue/fieldset'
  import Divider from 'primevue/divider'
  import Image from 'primevue/image'
  import resultat from '@/assets/images/faq/resultat.png'
</script>

<template>
  <div class="faq">
    <h1>{{ $t('FAQView.title') }}</h1>
    <div class="faq__question-list">
      <Panel :header="$t('FAQView.Question1.title')" toggleable :collapsed="true">
        <h5>1. {{ $t('FAQView.Question1.BetParagraph.title') }}</h5>
        <p>{{ $t('FAQView.Question1.BetParagraph.0') }}</p>
        <p>{{ $t('FAQView.Question1.BetParagraph.1') }}</p>
        <br />

        <h5>2. {{ $t('FAQView.Question1.CloseParagraph.title') }}</h5>
        <p>
          {{ $t('FAQView.Question1.CloseParagraph.0') }}
          <br />
          {{ $t('FAQView.Question1.CloseParagraph.1') }}
        </p>
        <br />

        <h5>3. {{ $t('FAQView.Question1.ResultParagraph.title') }}</h5>
        <p>{{ $t('FAQView.Question1.ResultParagraph.0') }}</p>
        <br />
        <p>
          <em>{{ $t('FAQView.Question1.ResultParagraph.1') }} :</em>
        </p>
        <Image class="faq__image" :src="resultat" alt="resultat" preview />
      </Panel>
      <Panel id="resultat-pari" :header="$t('FAQView.Question2.title')" toggleable :collapsed="true">
        <h3>{{ $t('FAQView.Question2.definitionParagraph.title') }}</h3>

        <p>{{ $t('FAQView.Question2.definitionParagraph.0') }}</p>
        <p>{{ $t('FAQView.Question2.definitionParagraph.1') }}</p>
        <br />
        <p>{{ $t('FAQView.Question2.definitionParagraph.2') }}</p>

        <Fieldset
          :legend="$t('FAQView.Question2.definitionParagraph.example.title')"
          toggleable
          :collapsed="true"
          class="faq__example">
          <p>
            {{ $t('FAQView.Question2.definitionParagraph.example.0') }}
            <br />
            {{ $t('FAQView.Question2.definitionParagraph.example.1') }}
            <br />
            {{ $t('FAQView.Question2.definitionParagraph.example.2') }}
          </p>

          <br />

          <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="200" valign="bottom">
                  <br />
                </td>
                <td width="200" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.winner') }}
                  </p>
                </td>
                <td width="200" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.loser') }}
                  </p>
                </td>
              </tr>
              <tr>
                <td width="200" valign="bottom">
                  <p>Cédric</p>
                </td>
                <td width="200" valign="bottom">
                  <p align="right">8</p>
                </td>
                <td width="200" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="200" valign="bottom">
                  <p>Martine</p>
                </td>
                <td width="200" valign="bottom">
                  <br />
                </td>
                <td width="200" valign="bottom">
                  <p align="right">4</p>
                </td>
              </tr>
              <tr>
                <td width="200" valign="bottom">
                  <p>Édith</p>
                </td>
                <td width="200" valign="bottom">
                  <p align="right">2</p>
                </td>
                <td width="200" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="200" valign="bottom">
                  <p>Fabrice</p>
                </td>
                <td width="200" valign="bottom">
                  <br />
                </td>
                <td width="200" valign="bottom">
                  <p align="right">4</p>
                </td>
              </tr>
              <tr>
                <td width="200" valign="bottom">
                  <br />
                </td>
                <td width="200" valign="bottom">
                  <p align="right">10</p>
                </td>
                <td width="200" valign="bottom">
                  <p align="right">8</p>
                </td>
              </tr>
            </tbody>
          </table>

          <br />
          <p>
            {{ $t('FAQView.Question2.definitionParagraph.example.3') }}
          </p>

          <p>
            {{ $t('FAQView.Question2.definitionParagraph.example.4') }}
            <br />
            {{ $t('FAQView.Question2.definitionParagraph.example.5') }}
            <br />
            {{ $t('FAQView.Question2.definitionParagraph.example.6') }}
            <br />
            {{ $t('FAQView.Question2.definitionParagraph.example.7') }}
          </p>

          <br />

          <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.winner') }}
                  </p>
                </td>
                <td width="150" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.loser') }}
                  </p>
                </td>
                <td width="150" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.profit') }}
                  </p>
                </td>
              </tr>
              <tr>
                <td width="150" valign="bottom">
                  <p>Cédric</p>
                </td>
                <td width="150" valign="bottom">
                  <p align="right">8</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p align="right">6,4</p>
                </td>
              </tr>
              <tr>
                <td width="150" valign="bottom">
                  <p>Martine</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p align="right">4</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="150" valign="bottom">
                  <p>Édith</p>
                </td>
                <td width="150" valign="bottom">
                  <p align="right">2</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p align="right">1,6</p>
                </td>
              </tr>
              <tr>
                <td width="150" valign="bottom">
                  <p>Fabrice</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p align="right">4</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="150" valign="bottom">
                  <br />
                </td>
                <td width="150" valign="bottom">
                  <p align="right">10</p>
                </td>
                <td width="150" valign="bottom">
                  <p align="right">8</p>
                </td>
                <td width="150" valign="bottom">
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </Fieldset>
        <Divider />

        <h3>{{ $t('FAQView.Question2.dispatchParagraph.title') }}</h3>

        <p>
          {{ $t('FAQView.Question2.dispatchParagraph.0') }}
        </p>

        <Fieldset
          :legend="$t('FAQView.Question2.definitionParagraph.example.title')"
          toggleable
          :collapsed="true"
          class="faq__example">
          <p>
            {{ $t('FAQView.Question2.dispatchParagraph.example.0') }}
            <br />
            {{ $t('FAQView.Question2.dispatchParagraph.example.1') }}
            <br />
            <br />
            {{ $t('FAQView.Question2.dispatchParagraph.example.2') }}
            <br />
            <br />
          </p>

          <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="125" valign="bottom">
                  <p class="faq__category--mobile">V.</p>
                  <p class="faq__category--normal">{{ $t('FAQView.Question2.definitionParagraph.example.winner') }}</p>
                </td>
                <td width="120" valign="bottom">
                  <p class="faq__category--mobile">P.</p>
                  <p class="faq__category--normal">{{ $t('FAQView.Question2.definitionParagraph.example.loser') }}</p>
                </td>
                <td width="100" valign="bottom">
                  <p>
                    {{ $t('FAQView.Question2.definitionParagraph.example.profit') }}
                  </p>
                </td>
                <td width="250" valign="bottom">
                  <p>Dispatch</p>
                </td>
              </tr>
              <tr>
                <td width="120" valign="bottom">
                  <p>Cédric</p>
                </td>
                <td width="120" valign="bottom">
                  <p align="right">8</p>
                </td>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="65" valign="bottom">
                  <p align="right">6,4</p>
                </td>
                <td width="250" valign="bottom">
                  <p align="right">
                    4 (Martine) +
                    <span>1,6 (Fabrice)</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td width="120" valign="bottom">
                  <p>Martine</p>
                </td>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="120" valign="bottom">
                  <p align="right">4</p>
                </td>
                <td width="65" valign="bottom">
                  <br />
                </td>
                <td width="176" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="120" valign="bottom">
                  <p>Édith</p>
                </td>
                <td width="120" valign="bottom">
                  <p align="right">2</p>
                </td>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="65" valign="bottom">
                  <p align="right">1,6</p>
                </td>
                <td width="176" valign="bottom">
                  <p align="right">2,4 (Fabrice)</p>
                </td>
              </tr>
              <tr>
                <td width="120" valign="bottom">
                  <p>Fabrice</p>
                </td>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="120" valign="bottom">
                  <p align="right">4</p>
                </td>
                <td width="65" valign="bottom">
                  <br />
                </td>
                <td width="176" valign="bottom">
                  <br />
                </td>
              </tr>
              <tr>
                <td width="120" valign="bottom">
                  <br />
                </td>
                <td width="120" valign="bottom">
                  <p align="right">10</p>
                </td>
                <td width="120" valign="bottom">
                  <p align="right">8</p>
                </td>
                <td width="65" valign="bottom">
                  <br />
                </td>
                <td width="176" valign="bottom">
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </Fieldset>
      </Panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .faq {
    h1 {
      margin-bottom: 3rem;
    }

    h3 {
      margin-bottom: 1rem;
    }

    h5 {
      margin-bottom: 0.5rem;
    }

    p {
      white-space: pre-line;
    }

    &__image {
      margin-top: 1rem;
    }

    &__question-list {
      display: flex;
      flex-direction: column;
      gap: 3vh;
    }

    &__example {
      margin: 1rem 0;
    }

    &__category--normal {
      display: none;
    }

    table,
    th,
    td {
      border: 1px solid var(--surface-border);
    }

    td {
      padding: 0 2%;
    }

    span {
      display: inline-block;
    }

    ::v-deep(.p-panel-title) {
      line-height: 1.5;
    }
  }

  @include sm {
    .faq {
      &__category--mobile {
        display: none;
      }

      &__category--normal {
        display: block;
      }
    }
  }
</style>
