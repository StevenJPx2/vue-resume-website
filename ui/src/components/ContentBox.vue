<template>
  <div>
    <div class="preview" v-if="attendee || hostLive" v-html="getInput()"></div>
    <ckeditor
      v-else
      :editor="editor"
      :value="getInput()"
      @input="changeInput($event)"
      :config="config"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

export default {
  name: "ContentBox",
  model: { prop: "input", event: "change" },
  props: {
    attendee: { type: Boolean, default: false },
    hostLive: { type: Boolean, default: false },
    input: String
  },
  data() {
    return {
      editor: ClassicEditor,
      outputValue: "",
      config: {
        plugins: [
          Essentials,
          UploadAdapter,
          SimpleUploadAdapter,
          Autoformat,
          MediaEmbed,
          Highlight,
          Bold,
          Italic,
          BlockQuote,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Link,
          List,
          Paragraph,
          Alignment
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "alignment", // <--- ADDED
            "bold",
            "italic",
            "highlight",
            "link",
            "blockQuote",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "mediaEmbed",
            "|",
            "undo",
            "redo"
          ]
        },
        image: {
          toolbar: [
            "imageStyle:full",
            "imageStyle:side",
            "|",
            "imageTextAlternative"
          ]
        },
        simpleUpload: {
          uploadUrl: "http://" + location.hostname + ":5000/upload_image"
        }
      }
    };
  },
  methods: {
    getInput() {
      if (!this.attendee) {
        this.input = this.input.replace("iframe", "oembed");
        this.input = this.input.replace("src", "url");
        this.input = this.input.replace("embed/", "watch?v=");
        this.input = this.input.replace("iframe", "oembed");
      } else {
        this.input = this.input.replace("oembed", "iframe");
        this.input = this.input.replace("url", "src");
        this.input = this.input.replace("watch?v=", "embed/");
        this.input = this.input.replace("oembed", "iframe");
      }

      return this.input;
    },

    changeInput(endpoint) {
      this.$emit("change", endpoint);
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  text-align: left;
  max-width: 1200px;
}
</style>
