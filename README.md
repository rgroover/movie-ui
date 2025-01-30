# Media Search React UI

This is the front end for the media service.

The code is written in Typescript and uses Material UI for styling.

The frontend app is hosted as a Static Web App in Azure here:
[Media Search](https://groover.tech/)

The "about" page has more info on the project:
[About Page](https://groover.tech/about)

You'll need to install the Open Api Generator CLI:
https://openapi-generator.tech/

If you modify the backend C# view models, you'll have to re-generate the 
strongly typed typescript view models off of the swagger.json that is
served up by the Swagger support in ASP.Net Core. This requires 
you to be running the backend service. 
(see https://github.com/rgroover/movie-svc):
- openapi-generator-cli generate -i http://localhost:5002/swagger/v1/swagger.json -g typescript-axios -o ./api-client
- The resulting ts files should be copied to the "api-client" folder

To run the app locally you should be able to execute "npm run dev"
from the terminal