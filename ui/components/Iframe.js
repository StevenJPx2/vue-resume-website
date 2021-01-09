import { Node } from 'tiptap'

function translateSrc(src) {
  if (src === null) return ''
  const matchedSrc = src.match(/\?v=([\w\d]*)/)
  if (matchedSrc === null) return ''

  return `https://www.youtube.com/embed/${matchedSrc[1]}`
}

export default class Iframe extends Node {
  get name() {
    return 'iframe'
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null,
        },
      },
      group: 'block',
      selectable: false,
      parseDOM: [
        {
          tag: 'iframe',
          getAttrs: (dom) => ({
            src: dom.getAttribute('src'),
          }),
        },
      ],
      toDOM: (node) => [
        'iframe',
        {
          src: translateSrc(node.attrs.src),
          frameborder: 0,
          allowfullscreen: 'true',
        },
      ],
    }
  }

  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view() {
    return {
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        src: {
          get() {
            return this.node.attrs.src
          },
          set(src) {
            this.updateAttrs({
              src,
            })
          },
        },
      },
      methods: {
        translateSrc() {
          if (this.src === null) return ''
          const matchedSrc = this.src.match(/\?v=([\w\d]*)/)
          if (matchedSrc === null) return ''

          return `https://www.youtube.com/embed/${matchedSrc[1]}`
        },
      },
      template: `
        <div class="iframe">
          <iframe class="iframe__embed" :src="translateSrc()"></iframe>
          <input class="iframe__input" placeholder="https://www.youtube.com/watch?v=videoId" @paste.stop type="text" v-model="src" v-if="view.editable" />
        </div>
      `,
    }
  }
}
