<template>
  <div id="test">
    <div class="model">
        <!-- src="/models/zhifa_black_55_25.4cm_2K.glb" -->
        <!-- src="https://jizhan.s3.ap-northeast-1.amazonaws.com/model/a7be72c6-3006-471b-8b7a-5792f4fe0860.glb" -->
        <!-- src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" -->

      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
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
      <SfButton
        class="color-primary sf-button btn"
        @click="handelReturn"
      >
        Return
      </SfButton>
      <SfButton class="color-primary sf-button btn"> Check Out </SfButton>
      <SfButton class="color-primary sf-button btn" @click="handleShare"> Share </SfButton>
      <div class="tilltop">分享前请选取合适的角度</div>
    </div>
    <!-- <model-viewer v-if="isMounted" :src="url" camera-controls></model-viewer> -->
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
    const filePath = root.$route.query.path;
    // const newFile = `/ama/${filePath.split('.com/')[1]}`;
    console.log('00', filePath);
    const handleShare = () => {
      return root.$router.push({
        path: '/share',
        query: {
          path: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
        }
      });
    };
    return {
      handelReturn,
      filePath,
      handleShare
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      // isMounted: false,
      // url: '../assets/models/body_black_55_45cm.glb'
    };
  },
  // computed: {
  //   filePath() {
  //     console.log('00', this.$route.query.filePath);
  //     return this.$route.query.filePath;
  //   }
  // },
  mounted() {
    // this.isMounted = true;
    // this.loadComponent();
    import('@google/model-viewer');
  }

};
</script>

<style lang="scss" scoped>
#test {
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
