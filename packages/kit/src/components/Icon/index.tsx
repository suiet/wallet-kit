import React, { CSSProperties, ReactNode } from 'react';
import { Extendable } from '../../types/utils';

export type IconProps = Extendable & {
  icon: string | ReactNode;
  alt?: string;
  onClick?: () => void;
  elClassName?: string;
  elStyle?: CSSProperties;
};

/**
 * Wrap icon such as svg/img
 * with the essential dom properties: onClick, className, style...
 * @constructor
 */
const Icon = (props: IconProps) => {
  const { icon, alt = 'icon' } = props;
  return (
    <div
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {typeof icon === 'string' ? (
        <img
          src={icon}
          alt={alt}
          className={props.elClassName}
          style={props.elStyle}
        />
      ) : (
        React.cloneElement(icon as any)
      )}
    </div>
  );
};

export default Icon;
