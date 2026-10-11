import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const variants = {
  primary: "bg-brand-strong text-white hover:bg-ink",
  dark: "bg-ink text-white hover:bg-body",
  outline: "border border-line bg-white text-ink hover:border-ink",
  light: "border border-white/40 text-white hover:bg-white/10",
} as const;
const sizes = { sm: "min-h-11 px-4 text-sm", md: "min-h-12 px-6 text-sm", lg: "min-h-14 px-7 text-base" } as const;
type StyleProps = { variant?: keyof typeof variants; size?: keyof typeof sizes; className?: string };
function styles({ variant = "primary", size = "md", className }: StyleProps) {
  return cn("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className);
}
export function Button({ variant, size, className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={styles({ variant, size, className })} {...props} />;
}
export function ButtonLink({ variant, size, className, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { href: string }) {
  return <Link href={href} className={styles({ variant, size, className })} {...props} />;
}
