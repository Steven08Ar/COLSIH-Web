<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:#08111F;padding:32px 40px;text-align:left;">
            <p style="margin:0;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Colegio Santa Isabel de Hungría</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Nuevo mensaje de contacto</h1>
          </td>
        </tr>

        <!-- Alert strip -->
        <tr>
          <td style="background:#800A15;padding:10px 40px;">
            <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;">📨 Asunto: {{ $mensaje->asunto }}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #003C8F;margin-bottom:16px;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                  <p style="margin:0;font-size:15px;font-weight:600;color:#0f172a;">{{ $mensaje->nombre }}</p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr>
                <td width="48%" style="padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #003C8F;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Correo</p>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#003C8F;">{{ $mensaje->email }}</p>
                </td>
                <td width="4%"></td>
                <td width="48%" style="padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #64748b;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Teléfono</p>
                  <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">{{ $mensaje->telefono ?: '—' }}</p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr>
                <td style="padding:20px;background:#f8fafc;border-radius:8px;border-left:4px solid #800A15;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
                  <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-line;">{{ $mensaje->mensaje }}</p>
                </td>
              </tr>
            </table>

            <p style="margin:28px 0 0;font-size:12px;color:#94a3b8;">
              Puedes responder directamente a este correo — tu respuesta llegará a <strong>{{ $mensaje->email }}</strong>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">© {{ date('Y') }} Colegio Santa Isabel de Hungría · Floridablanca, Santander · colsih.edu.co</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
