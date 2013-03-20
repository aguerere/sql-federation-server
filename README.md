This is an Security Token Service example that speaks [WS-Federation](http://msdn.microsoft.com/en-us/library/bb498017.aspx) with Saml11 tokens fully implemented in node.js.

Users are authenticated with an SQL-Server table where user names and _salted_ passwords are stored, thus the name **sql-federation-server**. 

Since it uses [node-sqlserver](https://github.com/WindowsAzure/node-sqlserver) it can run only on Windows for now but you can easily swap this to some other thing like Postgresql or mongodb.


## Configuration

There are few environment variables you have to set in order to run this app:

-  ```SQL_CONNECTION_STRING```: this is the connection string to sql server.
-  ```WSFED_ISSUER```: The issuer of the WS-Federation tokens.
-  ```WSFED_CALLBACKS_URLS```: Comma-separated valid callback urls.
-  ```SITE_NAME```: The title to display in the login page.
-  ```SESSION_SECRET```: The secret of the cookie-session for single sign-on.

If you deploy this using iisnode, copy and Web.config-sample into Web.config and modify the settings there.

## Certificates

In order to sign the saml tokens, you need a valid certificate with public and private key.

You can generate a self signed certificate with the following command:

~~~
openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -subj "/CN=something.com" -keyout cert.key  -out cert.pem
~~~

Copy the two generated files to the ```certs``` folder and replace the ones provided as example.

## Customize the user validation mechanism

You can customize the way user and password are validated by changing the ```user.js``` file.

## Customize the login form

By default the login looks like this:

![](http://content.screencast.com/users/JoseFR/folders/Jing/media/88ff3098-5dcb-4840-bc67-06775fa84a0e/2013-03-14_1610.png)

You can change ```views/login.ejs```, ```public/site.css``` and ```public/imgs/logo.png```.

## License

MIT!