import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';

Amplify.configure(amplify);
// Amplify.configure({
//   Auth: {
//       identityPoolId: 'eu-west-2:cd50d3b1-f397-478b-a4e6-cf138218bf4b', //REQUIRED - Amazon Cognito Identity Pool ID
//       region: 'eu-west-2', // REQUIRED - Amazon Cognito Region
//       userPoolId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
//       userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Storage: {
//       AWSS3: {
//           bucket: 'awsapplication12b856bccbc54d9e94319a205630292a-javascript', //REQUIRED -  Amazon S3 bucket
//           region: 'eu-west-2', //OPTIONAL -  Amazon service region
//       }
//   }
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
