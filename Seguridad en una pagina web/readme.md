PROYECTO 17
-----------

DESCRIPCIÓN
-----------
El proyecto de hoy consiste en que tomes un sitio web que ya está creado y que es perfectamente funcional, pero que no tiene ninguna medida de seguridad aplicada, y que lo transformes en un sitio seguro, poniendo en juego todo lo que has aprendido el día de hoy.

PREPARACIÓN
-----------
1. Descarga y descomprime el archivo "Proyecto17.zip" (que contiene todo el código del sitio web de una agencia de viajes) y ábrelo en Visual Studio Code. Este archivo contiene el sitio en si mismo (es decir el desarrollo front-end de la aplicación) y el código de la API que usaremos para comunicar a ese sitio con la base de datos.

2. Descarga el script llamado "create_db_viajes.sql" que sirve para crear automáticamente la base de datos que usará nuestro sitio. Para hacer esto simplemente tienes que:
    - Abrir el archivo
    - Seleccionar todo el código y copiarlo
    - En MySQL Workbench crear una nueva consulta (File > New Query Tab)
    - Pegar el código que has copiado
    - Ejecutar ese código haciendo clic en "Execute" (botón del rayo)
    - En el panel Navigator, seleccionar la etiqueta Schemas y hacer clic en el icono de reciclaje del ángulo superior derecho.

CONSIGNA
--------
Deberás lograr los siguientes puntos de mejoramiento de la seguridad del sitio:

1. Complejidad de contraseña: Al crear un nuevo usuario, se debe validar que la contraseña cumpla con los siguientes requisitos: Tener al menos 8 caracteres, una mayúscula, una minúscula y un número.

2. Inyección de código: Al iniciar sesión, validar que para el campo contraseña solo se puedan ingresar letras y números, para evitar el ingreso de caracteres especiales. No lo haremos sobre el campo email ya que este campo sí debe permitir caracteres especiales como @, guiones o puntos.

3. Autenticación: Al iniciar sesión, se debe generar un token para manejar la sesión del usuario. Recuerda almacenar en localStorage este token.

4. Autorización: Una vez dentro del sitio, se deberá validar los permisos de los usuarios que intenten ingresar a la página Administración. Solo aquellos usuarios con el permiso admin (ID: 1), pueden acceder a esa página.

5. Encriptación y hashing: Al crear un nuevo usuario, antes de almacenar el email y contraseña en la base de datos, se debe encriptar el dato del email y aplicar la función hash para la contraseña. Tener en cuenta que para el login, también se va a tener que encriptar y hashear estos datos, antes de comparar contra los registros de la base.


NOTA EXTRA
----------
Algunas consideraciones sobre el punto 5. 
En la definición de los objetos aleatorios necesarios para encriptar o aplicar hashing, los mismo se deben declarar fuera de la función para que siempre utilice las mismas variables de base al generar la encriptación o hashing. Esto es para que luego al iniciar sesión, genere el mismo resultado ante el mismo texto de base. De otra forma, nunca va a coincidir con lo que está registrado en nuestra base. Por esta misma razón, la validación va a funcionar mientras la API esté en funcionamiento, ya que si se reinicia, estas variables de base van a cambiar de valor y el hashing y la encriptación no va a generar los mismos resultados.


MI DESEO
--------
¡Mucha suerte y mucha diversión! 