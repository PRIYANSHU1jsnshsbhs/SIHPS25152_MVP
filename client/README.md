# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Government Color Palette
CSS variables defined in `src/index.css` under `:root`:

| Token | Hex | Usage |
|-------|-----|-------|
| --gov-navy | #1A237E | Primary headers, navbar, primary buttons |
| --gov-ash | #F4F6F8 | Application background |
| --gov-ash-border | #E0E0E0 | Card borders, separators |
| --gov-danger | #B71C1C | Destructive actions (logout, reject) |
| --gov-success | #2E7D32 | Approved, success buttons |
| --gov-success-bg | #E8F5E9 | Success chip background |
| --gov-gold | #FFC107 | Accents, hover, highlight |
| --gov-gold-soft | #FFF4D6 | Soft hover states & awaiting chip |

Utility classes: `.gov-btn-*`, `.gov-chip-success`, `.gov-chip-await`, `.bg-gov-navy`, `.text-gov-success`, etc.

Example:
```jsx
<button className="gov-btn gov-btn-primary">Save</button>
<span className="gov-chip-success">Verified</span>
```

To adjust palette, edit the CSS variables only; component classes will inherit the new colors.
