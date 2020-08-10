import { configure, addParameters, addDecorator } from '@storybook/react';
import { withThemesProvider } from 'themeprovider-storybook';
import { theme } from 'utils/theme';

import 'antd/dist/antd.css';

addParameters({
    options: {
        storySort: (a, b) => {
            // We want the Welcome story at the top
            if (a[1].kind === 'Welcome') {
                return -1;
            }

            // Sort the other stories by ID
            // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
            return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true });
        },
    },
});
addDecorator(withThemesProvider([{ name: 'Default Theme', ...theme }]));
// automatically import all files ending in *.stories.(ts|tsx)
const req = require.context('../stories', true, /.stories.tsx?$/);

// the first argument can be an array too, so if you want to load from different locations or
// different extensions, you can do it like this: configure([req1, req2], module)
configure(req, module);
