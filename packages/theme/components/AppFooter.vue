<template>
  <SfFooter :column="1" class="footer" :open="['Social']">
    <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage
          v-for="item in social"
          :key="item"
          class="footer__social-image"
          :src="'/icons/' + item + '.svg'"
          :alt="item"
          width="32"
          height="32"
        />
      </div>
      <div>@ 2021 FDWing Powered bu Shopify</div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfImage } from '@storefront-ui/vue';

export default {
  components: {
    SfFooter,
    SfImage
  },
  data() {
    return {
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
.footer {
  margin-bottom: -3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-button--pure {
  display: none;
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    // @include for-mobile {
    // margin: var(--spacer-sm);
    margin: var(--spacer-xl);
    padding-bottom: var(--spacer-xl);
    // }
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
.sf-footer-column {
  display: flex;
  justify-content: center;
}
</style>
