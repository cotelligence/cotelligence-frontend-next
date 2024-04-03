'use client';
import { Button, extendVariants, forwardRef } from '@nextui-org/react';

const TempButton = extendVariants(Button, {
  variants: {
    size: {
      md: 'px-unit-8 text-large',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

// Force default
export const MyButton: typeof Button = forwardRef(
  ({ color = 'primary', size = 'md', ...props }, ref) => (
    <TempButton color={color} size={size} {...props} ref={ref} />
  ),
);
