const path = require('path');

module.exports = {
    webpackFinal: async (config) => {
        config.resolve.modules = [path.resolve('./'), ...(config.resolve.modules || [])];
        return config;
    },
    addons: ['@storybook/preset-typescript'],
};
