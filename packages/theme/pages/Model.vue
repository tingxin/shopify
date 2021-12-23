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
      <SfButton class="color-primary sf-button btn"> Check Out </SfButton>
      <SfButton class="color-primary sf-button btn" @click="handleShare">
        Share
      </SfButton>
      <div class="tilltop">分享前请选取合适的角度</div>
    </div>
  </div>
</template>
<script>
// import('@google/model-viewer');
import { SfButton } from '@storefront-ui/vue';
export default {
  components: { SfButton },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props, { root }) {
    const handelReturn = () => {
      return root.$router.push('/step1');
    };

    const handleShare = () => {
      return root.$router.push({
        path: '/share',
        query: {
          path: root.$route.query.path,
        },
      });
    };
    return {
      handelReturn,
      handleShare,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {};
  },
  methods: {
    getModleFile() {
      const filePath = this.$route.query.path;

      document.getElementById('model').src = filePath;
      // document.getElementById('model').src =
      //   'https://jizhan1.s3.us-east-1.amazonaws.com/model/03656bf0-1838-427a-a96e-f4f658431cad.glb';
    },
  },

  mounted() {
    import('@google/model-viewer');
    this.getModleFile();
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
    //  @include for-desktop{
    //   align-items: center;
    //  }
    .btn {
      width: 150px;
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
}
</style>
