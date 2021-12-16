<template name="Cropper">
<div>
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>
    <div class="cut">
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber"
        :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
        :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
				@real-time="realTime" :high="option.high"
          @img-load="imgLoad" mode="cover" :max-img-size="option.max" @crop-moving="cropMoving" ></vue-cropper>
    </div>
     <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
    <div class="test-button">
      <button @click="changeImg" class="btn">changeImg</button>
      <label class="btn" for="uploads">upload</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)">

      <button @click="clearCrop" class="btn">clear</button>
      <button @click="refreshCrop" class="btn">refresh</button>

      <button @click="finish('base64')" class="btn">preview(base64)</button>
      <a @click="down('base64')" class="btn">download(base64)</a>
         <a @click="() => option.img = ''" class="btn">清除图片</a>
    </div>
    <div v-if="is2D === ''">

    <img :src="path" class="img">
    </div>
    </div>
</template>
<script>
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [
        {
          img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
        }
      ],
      option: {
        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
        size: 1,
        full: false,
        outputType: 'png',
        name: 'demo.png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 160,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        max: 99999
      },
      show: true,
      fixed: true,
      fixedNumber: [16, 9],
      // 轮询时间
      timer: null,
      // 是否执行轮训
      is2D: '',
      requestId: '',
      // 回显图片路径
      path: ''
      // //是否回显
      // isShow:false
    };
  },
  components: {},
  watch: {
    requestId: {
      // 查看文件上传的处理状态
      handler(newVal) {
        if (newVal !== '' && this.is2D !== 'done') {
        // 实现轮询
          this.createSetInterval();
        } else if (newVal !== '' && this.is2D === 'done') {
          this.stopSetInterval();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 开启轮询  如果存在则先销毁定时器后重新开启
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    createSetInterval() {
      this.stopSetInterval();
      this.timer = setInterval(() => {
        this.getNewMessage();
      }, 5000);
    },
    // 关闭轮询
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    stopSetInterval() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    // 请求是否有新消息
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getNewMessage() {
      this.$axios({
        method: 'get',
        url: '/status',
        headers: {
          'x-jizhan-request-id': this.requestId
        }
      }).then(({data})=>{
        if (data.status === 'done') {
          this.stopSetInterval();
        }
        this.is2D = data.status;
      });
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh();
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          // console.log(data);
          const img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    realTime(data) {
      this.previews = data;
      // console.log(data);
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    down(type) {
      event.preventDefault();
      // 输出;
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data);

        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          const info = {
            name: this.option.name,
            data: data.split('data:image/png;base64,')[1]
          };
          // 获取远端图片
          this.$axios({
            method: 'post',
            url: '/profile',
            data: info
          }).then(({data})=>{
            this.requestId = data.request_id;
            this.path = data.path;
          });
        });
      }
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadImg(e, num) {

      // 上传图片
      // this.option.img
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          const blob = new Blob([e.target.result]);
          data = window.URL.createObjectURL(blob);
          // const file = new File([blob], '');

        } else {
          data = e.target.result;

        }
        if (num === 1) {
          this.option.img = data;
          this.option.name = file.name;
          this.option.outputType = file.name.split('/')[1];
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    imgLoad(msg) {
      console.log(msg);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    cropMoving(data) {
      console.log(data, '截图框当前坐标');
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    // console.log(window['vue-cropper'])

  }
};
</script>
<style lang="scss" scoped>

      .cut {
        width: 500px;
        height: 500px;
        margin: 30px auto;
      }

      .c-item {
        max-width: 800px;
        margin: 10px auto;
        margin-top: 20px;
      }

      .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
      }

      .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin:20px 10px 0px 0px;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
      }

      code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
      }

      /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/

      .test {
        height: 500px;
      }

      .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
      }

      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }

      .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }

      .c-item {
        display: block;
        user-select: none;
      }

      @keyframes slide {
        0%  {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
.img{
  width: 400px;
  height: 400px;
}
</style>
