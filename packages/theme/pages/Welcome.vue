<template>
  <div id="test">
    <SfBanner
      :title="heroe.title"
      :buttonText="heroe.buttonText"
      :background="heroe.background"
      :image="heroe.image"
      class="test-banner "
      @click="handleAccountClick"
    />
  </div>
</template>
<script>
import { SfBanner } from '@storefront-ui/vue';

export default {
  name: 'Test',

  components: {
    SfBanner
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, {root}) {
    const handleAccountClick = () => {
      return root.$router.push('/cropper');
    };
    return {
      handleAccountClick
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      heroe: {
        title: 'Custom wigs exclusively for you',
        subtitle: '',
        buttonText: 'Start Customizing',
        background: '#fff',
        image: {
          mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_328x224.jpg',
          desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_1240x400.jpg'
        },
        link: '/c/women/women-clothing-shirts'
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#test {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

::v-deep {
  .sf-banner__wrapper {
    @include for-desktop{
      background-color: #fff !important;
    }
  }

  .sf-link{
    --button-width: var(--spacer-4xl)
  }
}
.test-banner {
  --banner-justify-content: center !important;

}

</style>
