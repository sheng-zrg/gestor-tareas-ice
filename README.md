# Gestor de Tareas ICE

Aplicación web para gestionar y priorizar tareas con análisis automático de impacto usando IA (Google Gemini).

Implementa el método **ICE Score** (Impact, Confidence, Ease) para ordenar tareas por prioridad automáticamente.

## 🎯 Características

- ✅ **Crear tareas** con descripción y parámetros ICE
- ✅ **Análisis con IA** - usa Google Gemini para analizar tareas automáticamente
- ✅ **Score ICE automático** - calcula prioridad basada en Impact, Confidence, Ease
- ✅ **Editar tareas** - modifica parámetros en tiempo real
- ✅ **Ordenamiento automático** - tareas ordenadas por score descendente
- ✅ **Persistencia** - localStorage para guardar datos entre sesiones
- ✅ **Responsivo** - funciona en desktop, tablet y móvil
- ✅ **Material Design** - interfaz moderna con Material-UI

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + TypeScript
- **Build:** Vite 5
- **UI Components:** Material-UI (MUI)
- **State Management:** React Hooks (custom hooks)
- **Storage:** localStorage
- **AI:** Google Gemini API
- **Styling:** Material-UI sx prop + CSS global

## 📦 Instalación Local

### Requisitos previos

- Node.js 18+ 
- npm 9+
- API key de Google Gemini (obtenible en [Google AI Studio](https://aistudio.google.com/app/apikey))

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/sheng-zrg/gestor-tareas-ice.git
cd gestor-tareas-ice

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
echo "VITE_GEMINI_API_KEY=tu_api_key_aqui" > .env.local

# 4. Iniciar servidor de desarrollo
npm run dev

# Abre http://localhost:5173 en tu navegador
```

## 🚀 Desarrollo

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build optimizado
npm run preview

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format código
npm run format
```

## 📋 Uso

### Crear una tarea

1. Escribe la descripción en el campo "Descripción"
2. **Opción A - Manual:**
   - Ingresa valores para Impacto (1-10), Confianza (1-10), Facilidad (1-10)
   - Click "Guardar Tarea"

3. **Opción B - Con IA:**
   - Click "Analizar con IA"
   - Espera 2-3 segundos mientras Google Gemini analiza
   - Revisa los valores sugeridos
   - Ajusta si es necesario
   - Click "Guardar Tarea"

### Editar una tarea

1. Click en botón "Editar" en la tarjeta de la tarea
2. Modal se abre con valores actuales
3. Modifica Impacto, Confianza, Facilidad
4. El Score ICE se recalcula en vivo
5. Click "Guardar Cambios"

### Eliminar una tarea

1. Click en botón "Eliminar" (ícono de basura)
2. Tarea se elimina inmediatamente

## 📊 Score ICE

El valor **ICE** es un número entre 0-100 que indica prioridad:

```
Score = (Impact × Confidence × 10) / Ease
```

**Colores:**
- 🔴 **Rojo (67-100):** Alta prioridad
- 🟠 **Naranja (34-66):** Prioridad media
- 🟢 **Verde (0-33):** Baja prioridad

## 🏗️ Arquitectura

```
src/
├── components/          # Componentes presentacionales (100% UI)
│   ├── Navbar.tsx
│   ├── FormCrearTarea.tsx
│   ├── TaskList.tsx
│   ├── TaskCard.tsx
│   └── PriorityModal.tsx
├── hooks/               # Custom React hooks (lógica de estado)
│   ├── useLocalStorage.ts
│   ├── useTareas.ts
│   └── useModal.ts
├── services/            # APIs y servicios externos
│   └── gemini.ts
├── utils/               # Funciones puras y utilidades
│   └── ice.ts
├── types/               # Tipos TypeScript
│   └── index.ts
├── constants/           # Constantes globales
│   └── index.ts
├── App.tsx              # Componente raíz (orquestador)
├── index.css            # Estilos globales
└── main.tsx             # Punto de entrada
```

## 🔐 Variables de Entorno

```env
# API key de Google Gemini (obtén en https://aistudio.google.com/app/apikey)
VITE_GEMINI_API_KEY=tu_api_key_here
```

**Nota:** `.env.local` no se debe commitear. Se genera localmente en cada ambiente.

## 🧪 Testing Manual

### Flujo: Crear con IA

- [ ] Escribir descripción
- [ ] Click "Analizar con IA"
- [ ] Fields se llenan automáticamente
- [ ] Score se calcula
- [ ] Click "Guardar"
- [ ] Tarea aparece en lista ordenada

### Flujo: Editar Tarea

- [ ] Click "Editar" en card
- [ ] Modal abre
- [ ] Cambiar parámetros
- [ ] Score actualiza en vivo
- [ ] Click "Guardar Cambios"
- [ ] Card actualiza en la lista

### Validaciones

- [ ] No permitir descripción vacía
- [ ] No permitir descripción >200 chars
- [ ] Restricción ICE: 1-10
- [ ] Error messages claros
- [ ] Success messages al guardar

### Persistencia

- [ ] Recargar página → datos persisten
- [ ] DevTools → localStorage tiene tareas
- [ ] Cerrar pestaña → datos se guardan

## 🚀 Deploy en Vercel

### Opción 1: Automático

1. Push el código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click "New Project"
4. Selecciona el repositorio
5. Configura variable `VITE_GEMINI_API_KEY` en "Environment Variables"
6. Click "Deploy"

### Opción 2: CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Sigue los pasos interactivos
# Configura variables de entorno cuando te lo pida
```

## 📈 Build Size

Production build:
- **HTML:** 0.46 KB (gzip: 0.30 KB)
- **CSS:** 0.99 KB (gzip: 0.46 KB)  
- **JS:** 352 KB (gzip: 110 KB)

**Total gzipped:** ~111 KB

## 🐛 Troubleshooting

### Error: "No se puede conectar a Gemini"

- Verifica que `VITE_GEMINI_API_KEY` esté configurada
- Comprueba la API key en [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Asegúrate de tener internet funcional

### Error: "El servidor dev no inicia"

```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### localStorage no persiste

- Comprueba que no estés en modo privado/incógnito
- Verifica permisos de storage en el navegador
- Intenta en otro navegador

## 📝 Estructura de Datos

### Task

```typescript
interface Task {
  id: string                  // UUID generado
  description: string         // Max 200 caracteres
  impact: number              // 1-10
  confidence: number          // 1-10
  ease: number                // 1-10
  status: TaskStatus          // 'pending' | 'in_progress' | 'done'
  explanation: string         // Generado por IA o vacío
}
```

## 🔗 Enlaces útiles

- [Google Gemini API](https://aistudio.google.com/app/apikey)
- [Material-UI Docs](https://mui.com)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir.

## 👨‍💻 Autor

Desarrollado como parte del curso **Gestor de Tareas Inteligente con IA** (ICE).

---

**Última actualización:** Marzo 2026

Hecho con ❤️ usando React, TypeScript y Gemini API.
```
