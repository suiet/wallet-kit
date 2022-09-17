import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styles from './index.module.scss';

interface ModalProps {
  children: ReactNode;
  title: string;
  trigger: ReactNode;
}

function ConnectWalletModal({ children, title, trigger }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles['overlay']}>
          <Dialog.Content className={styles['content']}>
            <div className={styles.header}>
              <Dialog.Title className={styles['title']}>{title}</Dialog.Title>
              <Dialog.Close className={styles['close']}></Dialog.Close>
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ConnectWalletModal;
