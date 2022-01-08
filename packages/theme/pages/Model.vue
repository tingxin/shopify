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
      <!-- <SfButton class="color-primary sf-button btn" @click="handelReturn">
        Return
      </SfButton> -->
      <!-- <SfButton class="color-primary sf-button btn"> Check Out </SfButton> -->

      <!-- <input type="text" v-model="message" /> -->

      <SfButton class="color-secondary sf-button btn" @click="handelReturnCustomizer">
        Return to Customizer
      </SfButton>
      <SfButton class="color-secondary sf-button btn" @click="handelReturnCart"> Return to Cart </SfButton>
      <!-- <button
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        type="button"
        class="share-button"
      >
        SHARE
      </button> -->
      <SfNotification
        :visible="Boolean(notificationVisible)"
        persistent=""
        title=""
        :message="notificationVisible"
        action=""
        type="danger"
      />
    </div>
  </div>
</template>
<script>
import { SfButton,SfNotification } from '@storefront-ui/vue';
export default {
  components: { SfButton ,SfNotification},
  setup(props, { root }) {
    const handelReturn = () => {
      return root.$router.push('/step1');
    };
    const handelReturnCustomizer = () => {
      return root.$router.push('https://fdwig.com/collections/all');
    };
    const handelReturnCart = () => {
      return root.$router.push('https://fdwig.com/cart');
    }
    const message = `https://fdwig.com/model?filePath=${root.$route.query.filePath}`;
    const handleShare = () => {
    };
    return {
      handelReturn,
      handleShare,
      handelReturnCustomizer,
      handelReturnCart,
      message,
    };
  },
  data() {
    return {
      notificationVisible :'' 
    };
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
      this.notificationVisible = 'The path has been copied successfully';
      setTimeout(()=>{
        this.notificationVisible = ''
      },500)
    },
    onError (e) {
      alert('Failed to copy texts');
    },

    loadComponent() {
      return () => import('@google/model-viewer');
    },
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
      width: 250px;
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
    width: 250px;
    margin: var(--spacer-sm)  0;
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
