module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'devfriend.myshopify.com',
          storefrontAccessToken: 'd9bbf4bbfa49382930ca255fd8ca8f8e'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
