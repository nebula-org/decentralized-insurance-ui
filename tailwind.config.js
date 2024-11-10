/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

import { withAccountKitUi, createColorSet } from "@account-kit/react/tailwind";

// wrap your existing tailwind config with 'withAccountKitUi'
export default withAccountKitUi({
  // your tailwind config here
  // docs on setting up tailwind here: https://tailwindcss.com/docs/installation/using-postcss
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'h2': '1.5rem', // Custom size for h2
      },
      margin: {
        'h2': '1rem', // Custom margin for h2
      },
    },
  },
  plugins: [],

}, {
  // override account kit themes
  colors: {
    "btn-primary": createColorSet("#a173ff", "#a173ff"),
    "fg-accent-brand": createColorSet("#E82594", "#a173ff"),
  },
  borderRadius: "md",
})

