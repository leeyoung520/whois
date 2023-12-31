import React, { ReactNode } from 'react';
import { Col, Row, Typography, Form } from 'antd';
import { SignupProps } from '../container/Signup';

export default function AuthLayout({ children, onFinish }: { children: ReactNode, onFinish: (prop: any) => void}) {
  return (
    <>
      <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title style={{ fontFamily: 'Caligrahhy' }}>
            찾 아 야 한 다
          </Typography.Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form
            initialValues={{ remember: true }}
            style={{ width: 300, marginTop: 50 }}
            onFinish={onFinish}
          >
            {children}
          </Form>
        </Col>
      </Row>
    </>
  );
}
