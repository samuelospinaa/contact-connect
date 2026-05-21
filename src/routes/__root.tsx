import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { MarketProvider } from "@/lib/market-context";
import { Layout } from "@/components/Layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">This page slipped out of range.</p>
        <Link to="/" className="mt-6 inline-flex px-4 py-2 rounded-md bg-foreground text-primary-foreground text-sm">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something glitched.</h1>
        <button onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex px-4 py-2 rounded-md bg-foreground text-primary-foreground text-sm">
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tapt - Card for Businesses" },
      { name: "description", content: "Minimalist NFC contactless cards for business, networking and gifting." },
      { property: "og:title", content: "Tapt - Card for Businesses" },
      { name: "twitter:title", content: "Tapt - Card for Businesses" },
      { property: "og:description", content: "Minimalist NFC contactless cards for business, networking and gifting." },
      { name: "twitter:description", content: "Minimalist NFC contactless cards for business, networking and gifting." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/948ae078-c68b-4e10-bd44-2c95ce07a6a7" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/948ae078-c68b-4e10-bd44-2c95ce07a6a7" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MarketProvider>
        <Layout><Outlet /></Layout>
      </MarketProvider>
    </QueryClientProvider>
  );
}
