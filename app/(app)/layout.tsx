import { Toaster } from "@/components/ui/sonner"
import { SanityLive } from "@/sanity/lib/live"
import { ClerkProvider } from "@clerk/nextjs"


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
        <main>{children}</main>
        <Toaster position="bottom-center" />
        {/* conecteaza sanity in real time */}
        <SanityLive />
    </ClerkProvider>
  )
}

export default Layout