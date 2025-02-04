import clsx from "clsx";
import { ReactNode } from "react";
import "../Grid/Grid.scss"

const FlexContainer = ({
  className,
  hasGutters,
  children,
  ...props
}: FlexContainerProps) => (
  <div
    {...props}
    className={clsx(
      "flexContainer",
      !hasGutters && "flexContainer--no-gutters",
      className
    )}
  >
    {children}
  </div>
);

const FlexItem = ({
  xsmall,
  small,
  medium,
  large,
  children,
  columns,
  className,
  ...props
}: FlexItemProps) => (
  <div
    {...props}
    className={clsx(
      "flexItem",
      columns && `flexItem--${columns}`,
      xsmall && `flexItem--Xsmall-${xsmall}`,
      small && `flexItem--Small-${small}`,
      medium && `flexItem--Medium-${medium}`,
      large && `flexItem--Large-${large}`,
      className
    )}
  >
    {children}
  </div>
);

interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  hasGutters?: boolean;
  children: ReactNode;
}

FlexContainer.defaultProps = { hasGutters: true };

interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  columns?: number;
  xsmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  children?: ReactNode;
}

export { FlexContainer, FlexItem };
