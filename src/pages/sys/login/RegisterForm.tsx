import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { ReturnButton } from './components/ReturnButton';
import Title from './components/Title';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginProvider';

export default function RegisterForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.REGISTER) return null;

  return (
    <>
      <Title title={t('sys.login.signUpFormTitle')} />
      <Form name="normal_login" size="large" initialValues={{ remember: true }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('sys.login.accountPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.userName')} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: t('sys.login.password') }]}>
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: t('sys.login.confirmPasswordPlaceholder') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('sys.login.diffPwd')));
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder={t('sys.login.confirmPassword')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t('sys.login.registerButton')}
          </Button>
        </Form.Item>

        <div className="mb-2 text-xs text-gray">
          <span>{t('sys.login.registerAndAgree')}</span>
          <a href="./" className="text-sm !underline">
            {t('sys.login.termsOfService')}
          </a>
          {' & '}
          <a href="./" className="text-sm !underline">
            {t('sys.login.privacyPolicy')}
          </a>
        </div>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}
