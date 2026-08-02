# Verificación de producción

Fecha: 1 de agosto de 2026 (America/Bogota)

## Landing y experiencia

- URL estable: <https://guaufresh-landing.vercel.app>
- Estado del despliegue: `READY`.
- El logo transparente, las fotografías de producto, la fotografía del perro y el QR cargan con dimensiones naturales válidas.
- Sin desbordamiento horizontal en el viewport de escritorio evaluado.
- Precios visibles: 50 mL de $20.000 a $17.000 COP y 150 mL de $40.000 a $34.000 COP.
- El modal de pago muestra el QR de Bancolombia, la llave `@marcelam8101` y el acceso a WhatsApp para enviar el comprobante.

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
