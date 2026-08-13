"use client";

export function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.6 3.1 2.6 4.9 5.5 5.1v3.8c-2 0-3.8-.6-5.5-1.7v7.9c0 4.1-3.3 6.8-7.1 6.8-3.6 0-6.4-2.7-6.4-6.2 0-3.4 2.7-6.1 6.5-6.1.6 0 1.2.1 1.8.3v3.9a3.2 3.2 0 0 0-1.6-.5c-1.8 0-3.2 1.4-3.2 3.2 0 1.9 1.4 3.3 3.3 3.3 2.1 0 3.4-1.3 3.4-3.5V3h3.3z" />
    </svg>
  );
}
