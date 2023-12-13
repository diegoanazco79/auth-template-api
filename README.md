
# Auth Template

La configuración de despliegue de este proyecto se encuentra para Vercel. Si se requiere desplegar en otra plataforma, es necesario cambiar el `package.json` y además el `tsconfig.json`

El archivo de configuración para el despliegue en Vercel, es el siguiente: `vercel.json` y se encuentra en el `root`del proyecto.

El proyecto necesita las variables de entorno para poder funcionar, se encuentra un archivo `.env.example`

### Explicar cuales son las variables de entorno.


### Explicar como conseguir la contraseña para el gmail. 

 Get the app password from your Gmail account

To get an App Password for your Gmail account, follow these detailed steps:

Note: You’ll need to have two-step verification enabled on your Gmail account before generating an App Password. If you haven’t enabled it, do so first by going to your Google Account settings.

Access Your Google Account:
Start by visiting the Google Account management page. You can do this by navigating to https://myaccount.google.com/.
Sign In: Sign in to the Google Account associated with the Gmail address you want to use for sending emails programmatically.
Security: In the left sidebar, click on “Security.”
Scroll down to How you sign in to google and click on 2-step verificaiton.
App Passwords: Scroll down to “App passwords.” Click on “App passwords.” You may be prompted to re-enter your password for security purposes.
App name: Enter a custom name for this App Password. It helps you identify it later, so choose something related to the application or use case where you plan to use this App Password.
Create: Click the “Create” button. Google will create a unique 16-character App Password for your custom application/device.

Para poder utilizarlo, primero hay que crear un rol y luego recién los usuarios.


### Explicar el flujo de la autenticación.

