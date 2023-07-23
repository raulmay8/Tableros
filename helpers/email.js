import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) =>{
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
      });

      //oinformacion email
      const info = await transport.sendMail({
        from: '"Cuadro de cargas - Administrador" <cuentas@cuadros.com>',
        to: email,
        subject: 'Cuadro de cargas- Confirma tu cuenta',
        text: 'Comprueba tu cuenta en Cuadros de carga',
        html: `
            <p>Hola: ${nombre} Comprueba tu cuenta en Cuadros de carga</p>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}
export const emailOlvidePassword = async (datos) =>{
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //oinformacion email
      const info = await transport.sendMail({
        from: '"Cuadro de cargas - Administrador" <cuentas@cuadros.com>',
        to: email,
        subject: 'Cuadro de cargas- Reestablece tu password',
        text: 'Reestablece tu password',
        html: `
            <p>Hola: ${nombre} Has solicitado reestablecer tu password/p>
            <p>Sigue el siguiente enlace para generar nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
            <p>Si tu no solicitaste esto, puedes ignorar el mensaje</p>
        `
      })
}