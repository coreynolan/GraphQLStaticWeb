import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';
 
Vue.use(VueApollo)
const AUTH_TOKEN = 'apollo-token'
const defaultOptions = {
  httpEndpoint: '/api/graphql',
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  ssr: false,
}
 
// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const { apolloClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  })
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })
 
  return apolloProvider
}
 
export async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}
 
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
}
