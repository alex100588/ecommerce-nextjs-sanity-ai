import { CartStoreProvider } from "@/lib/store/cart-store-provider"
import { SanityLive } from "@/sanity/lib/live"
import { ClerkProvider } from "@clerk/nextjs"


const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ClerkProvider>
       <CartStoreProvider>
          {children}
        </CartStoreProvider>
        <SanityLive />
    </ClerkProvider>
  )
}

export default Layout