Stack și arhitectură

Frontend: Next.js 16 cu App Router, folosind Server și Client Components, Server Actions pentru logica server-side.

Autentificare: Clerk cu AgentKit – oferă context de user pentru AI Agents.

CMS/Backend: Sanity CMS + App SDK pentru:

gestionarea conținutului live,

real-time UI updates prin Sanity Live,

webhook-driven order management.

AI & LLM: Vercel AI SDK cu AI Gateway – suport multi-provider LLM (Claude, GPT, Cohere).

Plăți: Stripe pentru checkout și procesare ordine, cu webhooks pentru stock management.

UI: Tailwind CSS v4 + shadcn/ui pentru componente frumoase și accesibile.

State management: Zustand cu persistență în localStorage pentru cart.

Tipizare Sanity: GROQ queries + TypeGen pentru fetch type-safe.

Responsive & Dark Mode: design modern, mobile-first și dark mode complet.

Funcționalități principale
Autentificare & securitate

Clerk protejează rutele sensibile (/checkout, /orders, /orders/[id], /checkout/success).

Server-side proxy (proxy.ts) pentru a verifica autentificarea înainte de acces.

CMS & date

Sanity CMS:

Schema types și index.ts pentru backend.

Folder lib cu constante pentru filtrarea produselor, stoc, statusul comenzilor.

JSON sample-data pentru popularea automată a backend-ului.

Queries separate pentru fetch-ul datelor din Sanity.

Typegen + sanity.types.ts pentru tipizare automată.

Fetch server-side în pagină pentru:

Produse

Categorii

Featured products pentru carousel

UX & UI

Home page (Server Component):

Extrage parametri din URL, tipizează, setează valori implicite.

Alege query-ul corespunzător și fetch-uiește datele din Sanity.

ProductFilters (Client Component):

Utilizează useSearchParams pentru a gestiona filtrele din URL (categorie, culoare, material, preț, stock, sortare).

Sincronizare cu URL fără reload complet.

CategoryTitles:

Filtrare duplicate slug-uri.

Tile “All Products” tratat separat.

Indicator vizual pentru categoria activă.

ProductSection:

Sidebar cu filtre (togglable pe desktop).

ProductGrid care afișează produsele filtrate.

FeaturedCarousel:

În Suspense pentru a aștepta datele din backend.

Header, Product Page, Checkout Page:

Header cu cart și navigație.

Product page dinamica pe slug.

Checkout integrat cu Stripe + verificare autentificare.

Cart și Chat:

Zustand + CartStoreProvider și ChatStoreProvider pentru acces global.

Filtrare & căutare

Filtrele sunt salvate în search params pentru SEO și SSR.

URL-ul reflectă mereu filtrele active.

Categorii afișate direct din Sanity, separate de search params.

Search params folosit doar pentru:

Determinarea categoriei active

Filtrarea produselor în ProductSection

Filtre complexe: search, category, color, material, price, in-stock, sort.

AI & Admin

AI Shopping Assistant:

Custom tools pentru product search & order tracking.

Context user oferit de AgentKit.

AI Admin Dashboard:

Claude-powered insights, sales trends, recomandări.

Sanity App SDK + Vercel AI SDK:

Real-time live updates

AI insights integrate direct în app

Plăți & management comenzi

Stripe Checkout cu webhooks.

Comenzi vizibile doar pentru userii autentificați.

Stock management automat bazat pe webhook.

My Orders page pentru istoricul comenzilor.

Alte aspecte

Mobile-first, responsive, dark mode complet.

Server-side fetching pentru simplitate + posibil caching ulterior.

Componentizare clară: componente mici și interfețe de props definite deasupra.

Stilizare avansată: @container pentru adaptare la dimensiunea containerului, nu viewport.

Playlist și newsletter integrat (extras din demo).



## Arhitectura Aplicației

```mermaid
flowchart TD
    %% User Layer
    A[🌐 User / Browser] --> B[🚀 Next.js App Router]

    %% Server Layer
    B --> C[🖥 Server Components]
    C -->|📦 Fetch Data| D[📚 Sanity CMS]
    C -->|🔑 Auth / User Context| E[🛡 Clerk + AgentKit]
    C -->|🤖 AI Insights| F[🧠 Vercel AI SDK / AI Gateway]

    %% Client Layer
    C --> G[🎨 Client Components]
    G -->|🗂 State Management| H[⚡ Zustand + localStorage]
    G -->|🖌 Render UI| I[💎 shadcn/ui + Tailwind CSS]

    %% Payments
    G --> J[💳 Stripe Checkout]
    J -->|🔄 Webhook updates| D

    %% Live Updates
    D -->|⚡ Real-time Updates| G

    %% AI Tools
    F --> G
    F -->|📊 Admin Insights| K[📈 AI Admin Dashboard]
    G -->|🛒 Shopping Assistant| L[🔍 Product Search & Order Tracking]
