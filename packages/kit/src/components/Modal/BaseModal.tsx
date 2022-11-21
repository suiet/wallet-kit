import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";
import { Extendable } from "../../types/utils";
import classnames from "classnames";
import {DialogContentProps} from "@radix-ui/react-dialog";

export type BaseModalProps = Extendable & {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentProps?: DialogContentProps;
}

export const BaseModal = (props: BaseModalProps) => {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Trigger asChild>{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={'wkit-dialog__overlay'}>
          <Dialog.Content
            {...props.contentProps}
            className={classnames('wkit-dialog__content', props.className)}
            style={props.style}
          >
            {props.children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}