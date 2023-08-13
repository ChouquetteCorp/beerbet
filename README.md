BeerBet 🍻
===

> Vue 3, Vite, TS, PrimeVue, Supabase 💚

Experience a whole new way to enjoy your favorite matches with our sports betting site centered around fun and beers, without any money wagered.
https://beerbet.netlify.app/

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
npm run dev -- --mode=emulator # Launch front
npm run supabase:start # Launch backend
npm run supabase -- supabase functions serve end-bet


# Build
npm run build

# Lint with [ESLint](https://eslint.org/)
npm run lint
```



## Get Matchs

### Get matchs from API


```sh
export SPORT_API_KEY=xxx 
npx api-sport-cli get-matchs -c .github/configApiSport/default.json -u api_id
```
You need to define env `SPORT_API_KEY`.

It will create `matchs.sql` file, which contains all matchs from API.
You can import it in your database.



