export function cn(...values: (string | false | null | undefined)[]) { return values.filter(Boolean).join(" "); }

// Prefixes public asset paths with the basePath, which next/image and plain <video> src don't apply on their own.
export function asset(path: string) { return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`; }
