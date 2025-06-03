# NimbusNotes - Gestión de Proyectos y Notas

## Descripción
NimbusNotes es una aplicación web para la gestión de proyectos y notas, permitiendo la colaboración entre usuarios y la organización efectiva de tareas.

## Características Principales
- Gestión de proyectos colaborativos
- Creación y organización de notas
- Sistema de usuarios con roles
- Interfaz responsive
- Fechas de vencimiento para notas
- Estado de notas (completadas/pendientes)
- Notas importantes

## Guía de Usuario

### Roles de Usuario
- **Usuario Normal**: 
  - Gestión básica de notas
  - Ver proyectos donde está invitado
  - Crear notas en proyectos donde participa
  
- **Administrador**: 
  - Gestión completa de usuarios y sistema
  - Gestión completa de proyectos:
    * Crear nuevos proyectos
    * Editar proyectos existentes
    * Eliminar proyectos
    * Invitar usuarios a proyectos
    * Quitar usuarios de proyectos
    * Deshabilitar proyectos temporalmente

### Usuario Administrador por Defecto
La aplicación incluye un usuario administrador preconfigurado:
- **Username**: Admin
- **Password**: admin12345
- **Rol**: Administrador

### Funciones del Administrador
- Gestión completa de usuarios
- Modificación de roles
- Acceso a todas las funcionalidades del sistema
- Supervisión de proyectos y notas
- Control total sobre proyectos:
  * Creación y eliminación de proyectos
  * Gestión de usuarios en proyectos
  * Modificación de configuraciones de proyectos
  * Control de acceso a proyectos

> **Nota**: Solo los administradores pueden gestionar la participación de usuarios en proyectos. Los usuarios normales solo pueden ver y trabajar en los proyectos a los que han sido invitados.

### 1. Autenticación
- **Registro**: `/api/auth/register`
  - Crear una nueva cuenta proporcionando username, email y contraseña
  
- **Inicio de Sesión**: `/api/auth/login`
  - Acceder con email y contraseña
  
- **Cerrar Sesión**: `/api/auth/logout`
  - Finalizar sesión actual

### 2. Gestión de Proyectos
- **Crear Proyecto**: `/api/projects`
  - Nombre del proyecto
  - Descripción
  - Usuarios permitidos

- **Ver Proyectos**: `/api/projects`
  - Lista de proyectos donde el usuario participa
  
- **Editar Proyecto**: `/api/projects/:id`
  - Modificar nombre, descripción y usuarios
  
- **Eliminar Proyecto**: `/api/projects/:id`
  - Eliminar proyecto y sus notas asociadas

### 3. Gestión de Notas
- **Crear Nota**: `/api/notes`
  - Título
  - Contenido
  - Fecha de vencimiento
  - Marcar como importante
  
- **Ver Notas**: 
  - Por proyecto: `/api/projects/:id/notes`
  - Personales: `/api/notes/user`
  
- **Editar Nota**: `/api/notes/:id`
  - Modificar contenido y configuración
  
- **Eliminar Nota**: `/api/notes/:id`
  - Eliminar nota permanentemente

### 4. Funcionalidades Especiales
- **Notas Importantes**: Se marcan con un icono especial
- **Fechas de Vencimiento**: 
  - Notificación visual cuando se acerca la fecha
  - Marcado automático como completada al vencer
- **Filtros de Notas**:
  - Por estado (completadas/pendientes)
  - Por importancia
  - Por fecha

## Uso de la Aplicación

1. **Inicio**
   - Regístrate o inicia sesión
   - Explora la vista general de proyectos y notas personales

2. **Gestión de Proyectos**
   - Crea un nuevo proyecto desde el botón "+"
   - Añade usuarios colaboradores
   - Gestiona las notas dentro del proyecto

3. **Trabajo con Notas**
   - Crea notas desde cualquier vista
   - Establece fechas de vencimiento según necesidad
   - Marca notas importantes para seguimiento
   - Filtra y organiza según tus preferencias

4. **Colaboración**
   - Comparte proyectos con otros usuarios
   - Visualiza quién creó cada nota
   - Trabaja en tiempo real con tu equipo

## Consejos de Uso
- Utiliza las fechas de vencimiento para priorizar tareas
- Marca como importantes las notas críticas
- Organiza notas en proyectos para mejor gestión
- Revisa regularmente las notas pendientes
- Aprovecha los filtros para encontrar información rápidamente

> **Nota de Seguridad**: Se recomienda cambiar la contraseña del administrador después del primer inicio de sesión.

## Soporte
Para cualquier consulta o problema, contacta con el administrador del sistema.
