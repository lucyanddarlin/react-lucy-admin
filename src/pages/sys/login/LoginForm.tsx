import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai';

import { DEFAULT_USER, TEST_USER } from '@/_mock/assets';
import { SignInReq } from '@/api/services/userService';
import { useLogin } from '@/store/userStore';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

import Title from './components/Title';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginProvider';

function LoginForm() {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
  const [loading, setLoading] = useState<boolean>(false);

  const login = useLogin();
  const { loginState, setLoginState } = useLoginStateContext();

  // TODO: useSignIn

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const onLogin = async ({ username, password }: SignInReq) => {
    setLoading(true);
    try {
      await login({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title={t('sys.login.signInFormTitle')} />
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: DEFAULT_USER.username,
          password: DEFAULT_USER.password,
        }}
        onFinish={onLogin}
      >
        <div className="mb-4 flex flex-col">
          <Alert
            type="info"
            description={
              <div className="flex flex-col">
                <div className="flex">
                  <ProTag className="flex-shrink-0">Admin {t('sys.login.userName')}:</ProTag>
                  <strong className="ml-1" style={{ color: themeToken.colorInfoTextHover }}>
                    <span>{DEFAULT_USER.username}</span>
                  </strong>
                </div>

                <div className="flex">
                  <ProTag className="flex-shrink-0">Test {t('sys.login.userName')}:</ProTag>
                  <strong className="ml-1" style={{ color: themeToken.colorInfoTextHover }}>
                    <span>{TEST_USER.username}</span>
                  </strong>
                </div>

                <div className="flex">
                  <ProTag className="flex-shrink-0">{t('sys.login.password')}:</ProTag>
                  <strong className="ml-1" style={{ color: themeToken.colorInfoTextHover }}>
                    <span>{DEFAULT_USER.password}</span>
                  </strong>
                </div>
              </div>
            }
            showIcon
          />
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.userName')} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="select-none">{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="select-none text-right">
              <button
                className="!underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              >
                {t('sys.login.forgetPassword')}
              </button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.MOBILE)}
            >
              {t('sys.login.mobileSignInFormTitle')}
            </Button>
          </Col>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
            >
              {t('sys.login.qrSignInFormTitle')}
            </Button>
          </Col>
          <Col span={9} flex="1">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.REGISTER)}
            >
              {t('sys.login.signUpFormTitle')}
            </Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t('sys.login.otherSignIn')}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
