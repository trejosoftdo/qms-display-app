import * as React from 'react';

/**
 * ConditionalContainerProps defines the props for the Conditional Container Component.
 *
 * @property display - to indicate if the passed children are being displayed
 * @property children - the contained children
 */
interface ConditionalContainerProps {
  display?: boolean;
  children: React.ReactNode;
}

/**
 * A component that conditionally render a given set of children
 *
 * @param {ConditionalContainerProps} props - The props for the Conditional Container component.
 */
const ConditionalContainer: React.FC<ConditionalContainerProps> = (props: ConditionalContainerProps) => {
  if (!props.display) {
    return null;
  }
  return props.children;
}

export default ConditionalContainer;
