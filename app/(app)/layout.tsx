import { SanityLive } from "@/sanity/lib/live"
import { ClerkProvider } from "@clerk/nextjs"


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
        <main>{children}</main>
        {/* conecteaza sanity in real time */}
        <SanityLive />
    </ClerkProvider>
  )
}

export default Layout