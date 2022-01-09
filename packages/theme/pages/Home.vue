<template>
  <div id="home">
    <SfHero class="hero">
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
        :link="hero.link"
      />
    </SfHero>
    <LazyHydrate when-visible>
      <RelatedProducts
        :products="products"
        :loading="productsLoading"
        title="Match it with"
      />
    </LazyHydrate>
  </div>
</template>
<script type="module">
import { SfHero } from '@storefront-ui/vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { useProduct, useCart, productGetters } from '@vue-storefront/shopify';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Home',
  components: {
    SfHero,
    RelatedProducts,
    LazyHydrate,
  },
  setup() {
    const {
      products: relatedProducts,
      search: productsSearch,
      loading: productsLoading,
    } = useProduct('relatedProducts');
    const { cart, load: loadCart, addItem: addToCart, isInCart } = useCart();

    onSSR(async () => {
      await productsSearch({ limit: 8 });
      await loadCart();
    });
    return {
      products: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      getChkId: computed(() => cart.value.id),
      productsLoading,
      productGetters,
      addToCart,
      isInCart,
    };
  },
  data() {
    return {
      heroes: [
        {
          title: ' Custom wigs exclusively for you',
          subtitle: 'Start Customizing',
          buttonText: 'Start Customizing',
          background: '#eceff1',
          image: {
            mobile: 'home-mobile.jpg',
            desktop: 'home-desktop.jpg',
          },
          link: '/cropper',
          className: 'sf-hero-item--position-bg-top-left ',
        },
      ],
    };
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isInWishlist = !this.products[index].isInWishlist;
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm)
          var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}

::v-deep {

  .sf-link {
    --button-width: var(--spacer-4xl) !important;
  }
  .sf-hero-item__title {
    @include for-mobile {
    color: rgba(255,255,255,1) !important;
    }
  }
  .sf-hero-item__subtitle {
    display: none;
    @include for-mobile {
      display: block;
      padding: 8px ;
      border-radius: 4px;
      text-align:center;
      cursor: pointer;
      background: #000;
      color:#fff;
    }
  }
  .sf-hero__control--left, .sf-hero__control--right,.sf-hero__bullets{
    display: none;
  }
}
</style>
