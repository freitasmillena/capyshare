import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';


export const EmailTemplate  = ({
  response,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src='https://firebasestorage.googleapis.com/v0/b/capyshare.firebasestorage.app/o/capyshare%2Flogo.png?alt=media&token=72dfc17e-2305-468a-b0fc-190a264d667f'
          width={100}
          height={100}
          alt="CapyShare"
        />
        <Heading style={heading}>Your capy friend {response.userName} shared a capy file with you!</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={response?.shortUrl}>
              👉 Click here to download it 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you don't recognize it, please ignore this email.
          </Text>
          <Text style={paragraph}>
            <b>File Name:</b> {response.fileName}
          </Text>
          <Text style={paragraph}>
            <b>File Size:</b> {response.fileSize}
          </Text>
          <Text style={paragraph}>
            <b>File Type:</b> {response.fileType}
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- CapyShare Team
        </Text>
        <Hr style={hr} />
        <Img
          src='https://firebasestorage.googleapis.com/v0/b/capyshare.firebasestorage.app/o/capyshare%2Flogo.png?alt=media&token=72dfc17e-2305-468a-b0fc-190a264d667f'
          width={60}
          height={60}
          style={{
            WebkitFilter: 'grayscale(100%)',
            filter: 'grayscale(100%)',
            margin: '20px 0',
          }}
        />
        <Text style={footer}>CapyShare Inc.</Text>
        <Text style={footer}>
          Braga, Portugal
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#000000'
};

const link = {
  color: '#f4afe5',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};