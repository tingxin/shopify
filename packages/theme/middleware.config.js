module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'devfriend.myshopify.com', //https://accounts.shopify.com/store-login
          storefrontAccessToken: 'd9bbf4bbfa49382930ca255fd8ca8f8e', //c24d1d8294f006f42952f30a37ed6f33
        },
        currency: 'USD',
        country: 'US',
      },
    },
  },
};
