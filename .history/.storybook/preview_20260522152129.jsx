import '../src/app/globals.css';

import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });

/** @type { import('@storybook/nextjs-vite').Preview } */
const preview = {
  decorators: [
    (Story) => ()
  ]
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;