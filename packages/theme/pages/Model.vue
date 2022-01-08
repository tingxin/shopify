<template>
  <div id="model-viewer">
    <div class="model">
      <model-viewer
        id="model"
        autoplay
        camera-controls
        field-of-view="45deg"
        interaction-prompt="none"
        ar
        ar-modes="webxr scene-viewer quick-look"
        class="model-img"
      />
    </div>
    <div class="btns">
      <SfButton class="color-primary sf-button btn" @click="handelReturn">
        Return
      </SfButton>
      <SfButton class="color-primary sf-button btn" @click="returnCart"> Return to Cart </SfButton>
      <SfButton class="color-primary sf-button btn" @click="returnCollection"> Return to Customizer </SfButton>

      <!-- <input type="text" v-model="message" /> -->
      <button
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        type="button"
        class="share-button"
      >
        SHARE
      </button>
      <div class="tilltop">分享前请选取合适的角度</div>
    </div>
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue';
export default {
  components: { SfButton },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const handelReturn = () => {
      return root.$router.push('/step1');
    };
    // const filePath = root.$route.query.path;
    const message = `https://fdwig.myshopify.com/model?filePath=${root.$route.query.filePath}`;
    const handleShare = () => {
      // return root.$router.push({
      //   path: '/share',
      //   query: {
      //     path: root.$route.query.path
      //   }
      // });
    };
    return {
      handelReturn,
      handleShare,
      // filePath,
      message,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {};
  },

  mounted() {
    this.loadComponent();
    this.getModleFile();
  },
  methods: {
    getModleFile() {
      const filePath = this.$route.query.filePath;
      document.getElementById('model').src = filePath;
    },
    onCopy (e) {
      alert('You just copied: ' + e.text);
    },
    onError (e) {
      alert('Failed to copy texts');
    },

    loadComponent() {
      return () => import('@google/model-viewer');
    },
    returnCart() {
      window.location.href = "https://fdwig.com/cart";
    },
    returnCollection() {
      window.location.href = "https://fdwig.com/collections/all";
    }
  },
};
</script>

<style lang="scss" scoped>
#model-viewer {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  margin: var(--spacer-sm) auto;

  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    display: flex;
  }
  .model {
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    .btn {
      width: 200px;
      margin: var(--spacer-sm) 0 0;
      height: 43px;

      @include for-desktop {
        margin-left: var(--spacer-xl);
      }
    }
    .tilltop {
      @include for-desktop {
        margin: var(--spacer-sm) var(--spacer-xl);
      }
      color: red;
    }
  }

  .share-button {
    width: 150px;
    margin: var(--spacer-sm) 0 0;
    height: 43px;
    background: var(--button-background, var(--c-primary));
    border: var(
      --button-border,
      var(--button-border-style, solid)
        var(--button-border-color, var(--c-primary))
    );
    color: #fff;
    font: var(
      --button-font,
      var(--button-font-weight, var(--font-weight--semibold))
        var(--button-font-size, var(--font-size--base)) /
        var(--button-font-line-height, 1.2)
        var(--button-font-family, var(--font-family--secondary))
    );
    @include for-desktop {
      margin-left: var(--spacer-xl);
    }
  }
}
</style>
