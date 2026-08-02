# Verificación de producción

Fecha: 1 de agosto de 2026 (America/Bogota)

## Landing y experiencia

- URL estable: <https://guaufresh-landing.vercel.app>
- Estado del despliegue: `READY`.
- El logo transparente, las fotografías de producto, la fotografía del perro y el QR cargan con dimensiones naturales válidas.
- Sin desbordamiento horizontal en el viewport de escritorio evaluado.
- Precios visibles: 50 mL de $20.000 a $17.000 COP y 150 mL de $40.000 a $34.000 COP.
- El modal de pago muestra el QR de Bancolombia, la llave `@marcelam8101` y el acceso a WhatsApp para enviar el comprobante.

## Auditoría responsive con Playwright

Se ejecutó una nueva revisión el 1 de agosto de 2026 después de corregir el bloque promocional y el sistema de contención de los `grid`.

| Viewport | Ancho del documento | Elementos visibles fuera del viewport | Errores de consola |
| --- | ---: | ---: | ---: |
| 320 × 568 | 320 px | 0 | 0 |
| 360 × 800 | 360 px | 0 | 0 |
| 384 × 854 | 384 px | 0 | 0 |
| 412 × 915 | 412 px | 0 | 0 |
| 480 × 900 | 480 px | 0 | 0 |
| 768 × 1024 | 768 px | 0 | 0 |
| 1024 × 768 | 1024 px | 0 | 0 |
| 1440 × 900 | 1440 px | 0 | 0 |

- Se corrigieron cuatro expresiones CSS `min()` inválidas que impedían aplicar el ancho móvil esperado.
- El bloque amarillo de descuento ahora usa dos columnas reducibles y cambia a una columna en pantallas de hasta 360 px.
- El tamaño grande se aplica únicamente a `15 %`, no a todo el texto promocional.
- Los hijos de `grid`, botones, formularios, tarjetas, imágenes y modales pueden reducirse sin forzar el ancho del documento.
- La barra inferior permanece dentro del viewport y respeta el área segura del dispositivo.
- El menú móvil, el modal de pago y el desbloqueo del beneficio respondieron correctamente.
- Todas las imágenes cargaron con dimensiones naturales válidas.

## Registro de clientes

- Se completó desde la interfaz un registro ficticio con consentimiento explícito.
- La landing confirmó que el registro fue sincronizado.
- Se verificaron en `public.clients` el contacto, la mascota, la presentación, el consentimiento y la atribución.
- El registro ficticio fue eliminado después de la prueba; no quedaron datos de QA en la base.

## Seguridad y operación

- La tabla `public.clients` tiene RLS activo y no ofrece políticas públicas de lectura o escritura.
- La función de borde valida contenido, origen, consentimiento y límite de solicitudes antes de usar credenciales protegidas del servidor.
- La landing envía registros únicamente al endpoint HTTPS de Supabase.
- Vercel entrega HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y protección contra iframes externos.
- Vercel no reportó errores de ejecución durante la ventana de verificación.
- No hay tokens ni llaves privadas dentro del proyecto.
