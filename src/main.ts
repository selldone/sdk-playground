import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// ━━━ Selldone Core (gapi,...) ━━━
import { SelldoneCore } from "@selldone/core-js";
SelldoneCore.Setup();

// ━━━ Storefront SDK (xapi) ━━━
import {StorefrontSDK} from "@selldone/sdk-storefront";
StorefrontSDK.Setup(); // Set up the Shop SDK.



createApp(App).mount('#app')

