module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'fdwig.myshopify.com', //https://accounts.shopify.com/store-login
          storefrontAccessToken: 'c24d1d8294f006f42952f30a37ed6f33', //c24d1d8294f006f42952f30a37ed6f33
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
