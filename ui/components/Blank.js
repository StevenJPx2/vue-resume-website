import { Node } from 'tiptap'

export default class Blank extends Node {
  get name() {
    return 'blank'
  }

  get schema() {
    return {
      attrs: {
        value: {
          default: '',
        },
      },
      group: 'block',
      selectable: false,
      parseDOM: [
        {
          tag: 'input',
          getAttrs: (dom) => ({
            value: dom.getAttribute('value'),
          }),
        },
      ],
      toDOM: (node) => [
        'input',
        {
          value: node.attrs.value,
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
      props: ['node', 'updateAttrs', 'editable', 'view', 'getPos'],
      computed: {
        value: {
          get() {
            return this.node.attrs.value
          },
          set(value) {
            this.updateAttrs({
              value,
            })
          },
        },
      },
      methods: {
        deleteNode(e) {
          // make a prosemirror transaction
          // which available on editor node
          let val = e.target.value.trim()
          if (val == '') {
            let tr = this.view.state.tr
            let pos = this.getPos()
            tr.delete(pos, pos + this.node.nodeSize)
            this.view.dispatch(tr)
          }
          val = val.slice(0, val.length - 1)
          e.target.value = val
        },
      },
      template: `
      <div class="blank">
        <input 
          class="blank--input input" 
          placeholder="Blank" 
          @keydown.delete.prevent="deleteNode"
          @paste.stop 
          type="text" 
          v-model="value" 
          v-if="view.editable" 
          style="width: 15ch"
          onkeypress="this.style.width = this.value.length > 12 ? this.value.length*1.2 + 'ch' : '15ch';"
          v-focus
        />
      </div>
      `,
    }
  }
}
