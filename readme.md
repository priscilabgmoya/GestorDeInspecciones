# Sistema de Gestión de Calzado - Grupo 2
### Descripcion del sistema 
programacion para el frond-end 
1. **HTML5**
2. **CSS**
3. **BOOTSTRAP**

programacion para el back-end
1. [JavaScript ES6](https://developer.mozilla.org/es/docs/Web/JavaScript)

El proyecto contiene las siguientes **dependencias de producción**:
1. **express**  módulo Infraestructura web rápida, minimalista y flexible para Node.js
1. **dotenv**   módulo de carga Variables de entorno
1. **MySql**	módulo nativo de javascript para acceder a bases de datos MySql.
1. **cors**		módulo de middleware de express para configurar Cross-Origin Resource Sharing en una aplicación express.
1. **babel**  módulo que sirve para configurar javascript moderno a codigo de javascript estandar(que sea lo mas entendible posible)

También las siguientes **dependencias de desarrollo**:
1. **nodemon**	    Es una herramienta que ayuda a desarrollar aplicaciones basadas en node.js al reiniciar automáticamente la aplicación de Node.js cuando se detectan cambios en los archivos de código javascript en el directorio del proyecto.
2. **jest**		    Es un marco de pruebas automatizadas javascript.

### documentacion 
- [Definicion del sistema(caso de uso, diagrama de colaboracion)](https://frtutneduar.sharepoint.com/:w:/s/Ing.DeSoft-Grupo/EdVG2cwCr_RAq05OZiCypgoBTeQjt_zpO5v6NWkooNs6ig?e=ce0kXw)
- [Modelo de Dominio](https://frtutneduar.sharepoint.com/:i:/s/Ing.DeSoft-Grupo/ETXwhBNqGrJDl8WVJz0MI44BkASet3FcOuEza2L_UhergQ?e=ay9rcB)
- [Modelo Entidad-Relacion](https://frtutneduar.sharepoint.com/:b:/s/Ing.DeSoft-Grupo/EY-zumCpTP1Lomq0669MxjUBnminm5kjooVNbsCQycNtVQ?e=dyFdyn)

### Docentes: 
- Docente de Teoría: Mabel Torres. 
- Docente de Prática: Francisco Vicente.
### Integrantes:
- [Ceccarelli, Pablo Alejandro](https://github.com/pabloceccarelli)
- [Garcia Moya, Priscila Belén](https://github.com/priscilabgmoya)
- Gomez, Lourdes Carolina
- Gonella, María Sofía

### Instale las siguientes herramientas 
Para que funcione está aplicación web necesitan tener instalado las siguientes Herramientas.

1. **NodeJS** se puede descargar desde [https://nodejs.org/es/download/](https://nodejs.org/es/download/)
2. **XAMPP control panel** se puede descargar desde [https://www.apachefriends.org/](https://www.apachefriends.org/es/download.html)
3. Recomendamos que tengan instalado **git** (se puede descargar desde [https://git-scm.com/downloads](https://git-scm.com/downloads)) en su computadora para descargar el proyecto.
4. **Visual Studio Code** se puede descargar desde [https://code.visualstudio.com/](https://code.visualstudio.com/)

### Instale las siguientes extensiones en Visual Studio Code
1. **npm**  comandos de npm.
2. **npm intellisense** ayuda con el autocompletado de funciones, métodos, etc. de módulos javascript instalados en el proyecto 
3. **Prettier - Code formatter** ayuda a identar el código
4. **Bracket Pair Colorizer** ayuda en la visualización de bloques de código marcando llaves, corchetes y parentesis en distintos colores.
5. **import cost**  nos permite ver cuanto espacio ocupa la importación de un módulo en nuestros archivos
6. **vscode-icons** juegos de iconos para los archivos del proyecto.
7. **path intellisense** ayuda con el autocompletado de nombres de archivos y directorios del proyecto

## Restaurar la base de datos de ejemplo

Una vez instalado la herramienta de administración de bases de datos **XAMPP control panel** (es muy importante anotar la contraseña del usuario **root** de la base de datos).

1. Crear una conexión a la base de datos usando el usuario y contraseña del servidor de base de datos.
2. Crear una nueva base de datos **Recordar el nombre de la base de datos**
3. Restaurar la base de datos desde el archivo **respaldo-sistemas_de_gestion_calzado.sql** en la base de datos creada anteriormente

## ejecutar el proyecto 
1. Con una terminal ubicada en el directorio del proyecto ejecutar el siquiente comando
```
git clone https://github.com/priscilabgmoya/GestorDeInspecciones.git
```
1. Con una terminal ubicada en el directorio del proyecto ejecutar el siquiente comando

```
npm install
```
3. Con una terminal ubicada en el directorio del proyecto ejecutar el siquiente comando

```
npm run dev
```