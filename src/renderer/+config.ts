import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

/*
export default {
    clientRouting: true,
    hydrationCanBeAborted: true
} satisfies Config
*/

export default {
    passToClient: ['pageProps'],
    extends: vikeReact
}