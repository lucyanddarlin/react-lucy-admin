import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { SvgIcon } from '@/components/icon';

import { ReturnButton } from './components/ReturnButton';
import Title from './components/Title';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginProvider';

export default function ResetForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.RESET_PASSWORD) return null;

  return (
    <>
      <div className="mb-8 text-center">
        <SvgIcon icon="ic-reset-password" size="100" />
      </div>
      <Title title={t('sys.login.forgetFormTitle')} />
      <Form name="reset" size="large">
        <p className="mb-4 h-14 text-left text-gray">{t('sys.login.forgetFormSecondTitle')}</p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: t('sys.login.emailPlaceholder') }]}
        >
          <Input placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-black">
            {t('sys.login.sendEmailButton')}
          </Button>
        </Form.Item>
      </Form>
      <ReturnButton onClick={backToLogin} />
    </>
  );
}
