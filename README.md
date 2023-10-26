BeerBet 🍻
===

> Vue 3, Vite, TS, PrimeVue, Supabase 💚

Experience a whole new way to enjoy your favorite matches with our sports betting site centered around fun and beers, without any money wagered.
https://beer.chouquettebet.fr/

> This project won an award as runner up Most fun category in [Supabase Launch Week 8 Hackathon](https://supabase.com/blog/launch-week-8-hackathon-winners).


![social](https://github.com/ChouquetteCorp/beerbet/assets/20130405/767813f2-2dd1-4f75-81df-80b717f7b3f1)

## Features 
 - Create and Share Bet
 - Participate to bet
 - Template Bet with matches 
 - PWA (mobile first)


## Project Setup

```sh
# Install
npm install

# Compile and Hot-Reload for Development
npm run dev:emulator # Launch front
npm run supabase:start # Launch backend
npm run supabase:function # Launch backend function


# Type-Check, Compile and Minify for Production
npm run build

# Test
npm run test:unit #  Run Unit Tests with [Vitest](https://vitest.dev/)
npm run test:e2e  # Run e2e with [Cypress](https://cypress.io/)

# Lint with [ESLint](https://eslint.org/)
npm run lint
```


## Transform to XXX

All templates are defined under `templates`. You can use `npm run cb-cli` to transform or save templates.

```sh
npm run cb-cli
# Commands:
#  npm run cb-cli -- transform <template>  Transform repo with defined template
#  npm run cb-cli -- save <template>       Save current repo as template

```

Icon generator for template: https://realfavicongenerator.net
PWA screenshot: https://studio.app-mockup.com/

## Get Matchs

### Get matchs from API


```sh
export SPORT_API_KEY=xxx 
npx api-sport-cli get-matchs -c .github/configApiSport/default.json -u api_id
```
You need to define env `SPORT_API_KEY`.

It will create a `matchs.sql` file, which contains all matchs from API.
You can import it in your database.


## End-to-end tests

For E2E tests, we use [cypress](https://www.cypress.io/).
Cypress allows to test on several browsers (edge, chrome, firefox).


### Open Cypress

```bash
# Before open cypress, you need to start your project 
npm run supabase:start
npm run dev:emulator

# Open cypress
npm run cypress:open
```
The command will open the cypress app:
	- click on "E2E testing"
	- choose the browser.

The selected browser will open. You can select E2E specs to run it.

```sh
# OR RUN
npm run cypress:run
```

### Write tests

You can write tests in `tests/e2e/specs/` folder. Use `*.cy.ts` extension.


Quick introduction to Cypress syntax is available here: [https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn/).


#### Custom command

1. `cy.login(user: string)`
Log in with email and password.



