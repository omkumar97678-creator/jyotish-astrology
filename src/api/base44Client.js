import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Create a client with authentication required
export const base44 = createClient({
  appId: appId || 'local',
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

// In local standalone mode without a remote appId, cleanly disable automatic analytics network batch requests
if (!appId && base44) {
  try {
    base44.cleanup?.();
    if (base44.analytics) {
      base44.analytics.track = () => {};
    }
  } catch (_e) {
    // Ignore in standalone mode
  }
}
