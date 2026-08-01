<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>¡Suscripción confirmada!</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <tr>
          <td style="background:#08111F;padding:32px 40px;text-align:center;">
            <img src="{{ asset('marca/logo-colsih.svg') }}" alt="COLSIH" height="48" style="margin-bottom:16px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;">¡Bienvenido al boletín COLSIH!</h1>
            <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Colegio Santa Isabel de Hungría · Floridablanca, Santander</p>
          </td>
        </tr>

        <tr>
          <td style="padding:40px;text-align:center;">
            <div style="width:60px;height:60px;background:#003C8F;border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
              <span style="font-size:28px;">✓</span>
            </div>
            <h2 style="margin:0 0 12px;font-size:18px;font-weight:900;color:#08111F;">¡Tu suscripción fue confirmada!</h2>
            <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.7;max-width:400px;margin-left:auto;margin-right:auto;">
              A partir de ahora recibirás en <strong style="color:#003C8F;">{{ $correo }}</strong> nuestras circulares, noticias escolares y eventos de la comunidad educativa.
            </p>

            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="background:#003C8F;border-radius:50px;padding:14px 32px;">
                  <a href="https://colsih.edu.co/noticias" style="color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">Ver últimas noticias</a>
                </td>
              </tr>
            </table>

            <p style="margin:32px 0 0;font-size:12px;color:#94a3b8;">
              Si no solicitaste esta suscripción, puedes ignorar este correo.
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#08111F;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#475569;">
              © {{ date('Y') }} Colegio Santa Isabel de Hungría · Barrio Villabel, Floridablanca, Santander ·
              <a href="https://colsih.edu.co" style="color:#3b82f6;text-decoration:none;">colsih.edu.co</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
