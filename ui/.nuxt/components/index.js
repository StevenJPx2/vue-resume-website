export { default as TextBlock } from '../../components/TextBlock.vue'

export const LazyTextBlock = import('../../components/TextBlock.vue' /* webpackChunkName: "components/TextBlock'}" */).then(c => c.default || c)
