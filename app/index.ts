import {Application, TurnState} from '@microsoft/teams-ai';
import {BlobsStorage} from 'botbuilder-azure-blobs';
import adapter from './shared/adapter';
import * as bot from './bot';
import config from './shared/config';
import {ChatMessage} from './shared/types';

import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

var reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({ config: {
  instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
  /* ...Other Configuration Options... */
  enableAutoRouteTracking: true,
  extensions: [reactPlugin],
} });
appInsights.loadAppInsights();
appInsights.trackPageView();

type ConversationState = {
  messages: ChatMessage[];
};

export type ApplicationTurnState = TurnState<ConversationState>;

const storage = new BlobsStorage(
  config.blobConnectionString,
  config.blobContainerName
);

const app = new Application<ApplicationTurnState>({
  adapter,
  storage,
});

bot.setup(app);

export default app;
