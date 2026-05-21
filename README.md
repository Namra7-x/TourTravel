# React + Vite

Travely now reads its auth, bookings, wishlist, reviews, and tour catalog data from Supabase.

## Supabase Setup

Create a local `.env` file with:

```env
VITE_SUPABASE_URL=https://pzgasjafzjxjgljzcxov.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_LQHNH__JUswn4z6iH4SUOQ_WuAH4a4K
```

The Supabase project already includes the travel catalog schema, seeded tours, demo auth user, and linked wishlist, booking, and review rows.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
