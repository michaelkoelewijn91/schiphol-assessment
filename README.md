# Flight Search App ✈️

Deze applicatie biedt een eenvoudige zoekfunctionaliteit voor vluchten, waarbij de gebruiker op basis van een ingevoerde bestemming of vluchtnummer relevante vluchten kan vinden. De gegevens worden asynchroon opgehaald en kunnen gesorteerd worden op datum en verwachte tijd.

## 📌 Features

-   Twee implementaties: een simpele fetch en een fetcher die de methodiek van React Router 7 volgt.
-   CSS definitions met Tailwind en (S)CSS modules.
-   Zoekfunctionaliteit met minimaal 3 karakters invoer en debounce om de API niet onnodig te belasten.
-   Vluchten opgehaald via een API-route.
-   Resultaten beperkt tot maximaal 5 vluchten.
-   Sorteermogelijkheden op datum en tijd.
-   Tests met zowel Playwright als Jest.

## 📌 **Setup**

```sh
# install dependencies
npm install
npm run dev

# Run e2e happy flow
npm run test-e2e

# Run unit tests
npm run test-unit
```

## 🎨 Styling

De applicatie gebruikt de officiële Schiphol kleuren. Deze zijn gedefinieerd in **app.css** via Tailwind theme definitions.

## 🚀 API

De vluchtgegevens worden opgehaald via een aparte API-route:  
**Bestand:** `routes/api/byQuery.tsx`

## 🏗️ Implementaties

Er zijn twee implementaties van de fetch-functionaliteit:

1. **Remix / React Router 7 defaults - Fetcher**
    - Bestand: `app/routes/index.tsx`
    - url: http://localhost:5173
2. **Eenvoudige fetch (volgens het assessment "keep it simple")**
    - Bestand: `app/routes/withFetch.tsx`
    - url: http://localhost:5173/withfetch

## 🎨 CSS Implementatie

De styling is op twee manieren geschreven om zowel Tailwind- als (S)CSS-kennis aan te tonen:

-   **Tailwind CSS** (Thema en globale stijlen)
-   **(S)CSS module** – Specifiek voorbeeld:
    -   Bestand: `app/components/radioInput/style.module.scss`

## 🧪 Testing

De applicatie bevat testvoorbeelden met zowel Playwright als Jest:

-   **Playwright** (End-to-end tests): `app/tests/happyflow.spec.ts`
-   **Jest** (Unittests): `app/utils/utils.test.ts`

---
