
#  Aplicación Web de Gestión de Medios (Películas y Series)

##  Descripción del Proyecto

Este proyecto consiste en el desarrollo de una aplicación web construida con **ReactJS** para el frontend y **Node.js con Express** para el backend, la cual permite gestionar información relacionada con medios audiovisuales como películas y series.

La aplicación se conecta a una **API REST** previamente desarrollada, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre diferentes módulos del sistema.

---

##  Objetivo

Desarrollar una aplicación web que permita la administración de:

* Géneros
* Directores
* Productoras
* Tipos (Película / Serie)
* Medios (Películas y series)

Todo esto mediante una interfaz  que se comunica con una API REST.

---

##  Tecnologías Utilizadas

### 🔹 Frontend

* ReactJS
* JavaScript
* HTML5
* CSS3
* Bootstrap


### 🔹 Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Nodemon

---

##  Estructura 

```
/frontend
  /src
    /pages
    /services

/backend
  /models
  /controllers
  /routes
```

---

##  Funcionalidades

###  Módulo Género

* Crear géneros
* Listar géneros
* Editar géneros
* Eliminar géneros

###  Módulo Director

* Crear directores
* Listar directores
* Editar directores
* Eliminar directores

###  Módulo Productora

* Gestión de productoras

###  Módulo Tipo

* Clasificación (Película / Serie)

###  Módulo Media

* Registro de películas y series
* Asociación con género, director, productora y tipo

---

##  Comunicación con la API

El frontend consume la API REST mediante **Axios**, realizando peticiones HTTP:

* GET → Obtener datos
* POST → Crear registros
* PUT → Actualizar registros
* DELETE → Eliminar registros

---

##  Ejecución del Proyecto

### 🔹 Backend

```bash
cd backend
npm install
npm run dev
```

Servidor disponible en:

```
http://localhost:4000
```

---

###  Frontend

```bash
cd frontend
npm install
npm start
```

Aplicación disponible en:

```
http://localhost:3000
```

---

##  Pruebas Realizadas

Se realizaron pruebas de:

* Creación de registros
* Edición de datos
* Eliminación de registros
* Visualización de información

---

##  Manejo de Errores

Se implementó:

* Validación de campos en formularios
* Manejo de errores con `try/catch`
* Control de errores provenientes del backend (status 500)

---




---

##  

Proyecto desarrollado por:

**Daniela Stephanni Jiménez Navarro**

---

