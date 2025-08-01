"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toasterVariants = cva("toaster group", {
  variants: {
    position: {
      "top-left": "",
      "top-center": "",
      "top-right": "",
      "bottom-left": "",
      "bottom-center": "",
      "bottom-right": "",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

type CustomToasterProps = ToasterProps & VariantProps<typeof toasterVariants>;

const Toaster = ({ position, className, ...props }: CustomToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={position}
      className={cn(toasterVariants({ position }), className)}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster, toasterVariants };
