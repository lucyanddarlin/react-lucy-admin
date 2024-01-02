import { QRCode } from 'antd';
import { useTranslation } from 'react-i18next';

import { ReturnButton } from './components/ReturnButton';
import Title from './components/Title';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginProvider';

function QrCodeForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  if (loginState !== LoginStateEnum.QR_CODE) return null;

  return (
    <>
      <Title title={t('sys.login.qrSignInFormTitle')} />
      <div className="flex w-full flex-col items-center justify-center">
        <QRCode value="https://ant.design/" size={300} />
        <p className="my-4 text-sm">{t('sys.login.scanSign')}</p>
      </div>
      <ReturnButton onClick={backToLogin} />
    </>
  );
}

export default QrCodeForm;
