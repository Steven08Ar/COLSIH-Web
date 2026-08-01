<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nueva suscripción al boletín</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <tr>
          <td style="background:#08111F;padding:32px 40px;">
            <p style="margin:0;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Boletín COLSIH</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:900;">Nueva suscripción recibida</h1>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.6;">
              Un nuevo usuario se ha suscrito al boletín de noticias del colegio:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:18px 20px;background:#f0f9ff;border-radius:8px;border-left:4px solid #003C8F;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Correo suscrito</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#003C8F;">{{ $correo }}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 40px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;">© {{ date('Y') }} Colegio Santa Isabel de Hungría · colsih.edu.co</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
