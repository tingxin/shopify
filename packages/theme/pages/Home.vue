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

    <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        image="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/newsletter_1240x202.jpg?v=1616496568"
        class="call-to-action"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script type="module">
import {
  SfHero,
  SfCallToAction,
} from '@storefront-ui/vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { useProduct, useCart, productGetters } from '@vue-storefront/shopify';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Home',
  components: {
    SfHero,
    RelatedProducts,
    SfCallToAction,
    MobileStoreBanner,
    LazyHydrate
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const {
      products: relatedProducts,
      search: productsSearch,
      loading: productsLoading
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
      isInCart
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      heroes: [
        {
          title: ' Custom wigs exclusively for you',
          subtitle: 'Try on online',
          buttonText: 'Start Customizing',
          background: '#eceff1',
          image: {
            mobile:
              'home-mobile.jpg',
            desktop:
              'home-desktop.jpg'
          },
          link: '/cropper',
          className: 'sf-hero-item--position-bg-top-left '
        }
      ]
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    toggleWishlist(index) {
      this.products[index].isInWishlist = !this.products[index].isInWishlist;
    }
  }
};
</script>

<style lang="postcss" scoped>
  ::v-deep.sf-link {
      /* --button-width: auto; */
      --button-width: var(--spacer-4xl)!important
    }

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
  .sf-hero__controls {
    --hero-controls-display: none;
  }
  /* .sf-hero-item__button {
    @include for-desktop {
      display: block;
      text-align: center;
      : var(--spacer-4xl)!important
      
    }
    
  } */
  .glide__slide a {
    @include for-desktop {
      display: block;
      width: 230px;
    }
  }
}

.banner-grid {
  /* --banner-container-width: 50%; */
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}



.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}
</style>
