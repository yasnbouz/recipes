/* eslint-disable */

const { GRAPHCMS_PROJECT_API, GRAPHCMS_PROD_AUTH_TOKEN, GRAPHCMS_DEV_AUTH_TOKEN, GRAPHCMS_PREVIEW_SECRET } = process.env;
module.exports = {
    publicRuntimeConfig: {
        GRAPHCMS_PROJECT_API,
        GRAPHCMS_PROD_AUTH_TOKEN,
        GRAPHCMS_DEV_AUTH_TOKEN,
        GRAPHCMS_PREVIEW_SECRET,
    },
};
