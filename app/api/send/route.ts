import { EmailTemplate } from './../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: 'capyshare@resend.dev',
      to: ['freitasmillena27@gmail.com'],
      subject: response?.userName + ' shared a capy file with you!',
      react: EmailTemplate({ response }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}