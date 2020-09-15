export { default as FillBlock } from '../../components/FillBlock.vue'
export { default as Handle } from '../../components/Handle.vue'
export { default as Icon } from '../../components/Icon.vue'
export { default as Iframe } from '../../components/Iframe.js'
export { default as MatchBlock } from '../../components/MatchBlock.vue'
export { default as PollBlock } from '../../components/PollBlock.vue'
export { default as QrBlock } from '../../components/QRBlock.vue'
export { default as TextBlock } from '../../components/TextBlock.vue'

export const LazyFillBlock = import('../../components/FillBlock.vue' /* webpackChunkName: "components/FillBlock'}" */).then(c => c.default || c)
export const LazyHandle = import('../../components/Handle.vue' /* webpackChunkName: "components/Handle'}" */).then(c => c.default || c)
export const LazyIcon = import('../../components/Icon.vue' /* webpackChunkName: "components/Icon'}" */).then(c => c.default || c)
export const LazyIframe = import('../../components/Iframe.js' /* webpackChunkName: "components/Iframe'}" */).then(c => c.default || c)
export const LazyMatchBlock = import('../../components/MatchBlock.vue' /* webpackChunkName: "components/MatchBlock'}" */).then(c => c.default || c)
export const LazyPollBlock = import('../../components/PollBlock.vue' /* webpackChunkName: "components/PollBlock'}" */).then(c => c.default || c)
export const LazyQrBlock = import('../../components/QRBlock.vue' /* webpackChunkName: "components/QRBlock'}" */).then(c => c.default || c)
export const LazyTextBlock = import('../../components/TextBlock.vue' /* webpackChunkName: "components/TextBlock'}" */).then(c => c.default || c)
