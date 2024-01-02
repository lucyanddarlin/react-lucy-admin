import { Button, Col, Form, Input, Row, Statistic } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReturnButton } from './components/ReturnButton';
import Title from './components/Title';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginProvider';

const { Countdown } = Statistic;

const countdownSecond = 60;

function MobileForm() {
  const { t } = useTranslation();

  const [countdown, setCountdown] = useState<number>(0); // 倒计时秒数
  const [second, setSecond] = useState<number>(0);
  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.MOBILE) return null;

  const start = () => {
    setCountdown(countdownSecond);
    setSecond(countdownSecond);
  };

  const reset = () => {
    setCountdown(0);
    setSecond(0);
  };

  return (
    <>
      <Title title={t('sys.login.mobileSignInFormTitle')} />
      <Form name="normal_login" size="large" initialValues={{ remember: true }}>
        <Form.Item name="phone" rules={[{ required: true, message: 'please input your phone' }]}>
          <Input placeholder={t('sys.login.mobile')} />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: t('sys.login.mobilePlaceholder') }]}
        >
          <Row justify="space-between">
            <Col span={14}>
              <Input placeholder={t('sys.login.smsCode')} />
            </Col>
            <Col span={9} flex={1}>
              <Button className="w-full !text-sm" onClick={start} disabled={countdown !== 0}>
                {countdown === 0 ? (
                  <span>{t('sys.login.sendSmsButton')}</span>
                ) : (
                  <div className="flex items-center justify-center">
                    <Countdown
                      className="hidden"
                      value={Date.now() + countdown * 1000}
                      onChange={(time) => {
                        setCountdown(Number(time) / 1000);
                        setSecond(Math.floor(Number(time) / 1000));
                      }}
                      format="ss"
                      onFinish={reset}
                    />
                    <span className="ml-1">{t('sys.login.sendSmsText', { second })}</span>
                  </div>
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>
      </Form>
      <ReturnButton onClick={backToLogin} />
    </>
  );
}

export default MobileForm;
