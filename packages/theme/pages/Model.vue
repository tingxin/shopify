<template>
  <div id="test">

    <model-viewer
        src="/models/body_black_55_45cm.glb"
        autoplay
        camera-controls
        field-of-view="45deg"
        interaction-prompt="none"
        ar
        ar-modes="webxr scene-viewer quick-look"
      />
              <!-- <model-viewer v-if="isMounted" :src="url" camera-controls></model-viewer> -->
  </div>
</template>
<script>
import('@google/model-viewer');

export default {
  name: 'Test',

  components: {

  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // setup(props, {root}) {
  //   const handleAccountClick = () => {
  //     return root.$router.push('/');
  //   };
  //   return {
  //     handleAccountClick
  //   };
  // },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      // isMounted: false,
      // url: '../assets/models/body_black_55_45cm.glb'
    };
  },
  mounted() {
    // this.isMounted = true;
    // this.loadComponent();
  },
  computed: {
    // loadComponent() {
    //   return () => import('@google/model-viewer');
    // }
  }
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
}

</style>
