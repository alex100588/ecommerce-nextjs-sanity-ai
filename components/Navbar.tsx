"use client";

import Link from "next/link";
import { useState } from "react";
import { Package, ShoppingBag, Sparkles, User, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";
import { ThemeToggle } from "./light-dark-mode/ThemeToggle";

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            The Furniture Store
          </span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <SignedIn>
            <Button asChild>
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">My Orders</span>
              </Link>
            </Button>
          </SignedIn>

          {/* {!isChatOpen && (
            <Button
              onClick={openChat}
              className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200/50 transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-300/50 dark:shadow-amber-900/30 dark:hover:shadow-amber-800/40"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Ask AI</span>
            </Button>
          )} */}

          <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Open cart ({totalItems} items)</span>
          </Button>

          <SignedIn>
            <UserButton
              afterSwitchSessionUrl="/"
              appearance={{ elements: { avatarBox: "h-9 w-9" } }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          </SignedOut>

          <div className="ms-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 space-y-2">
          <SignedIn>
            <Link href="/orders" className="block px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
              My Orders
            </Link>
          </SignedIn>

          {/* {!isChatOpen && (
            <Button
              onClick={() => {
                openChat();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md dark:shadow-amber-900/30"
            >
              <Sparkles className="h-4 w-4" />
              Ask AI
            </Button>
          )} */}

          <Button
            variant="ghost"
            onClick={() => {
              openCart();
              setMobileMenuOpen(false);
            }}
            className="w-full justify-start gap-2"
          >
            <ShoppingBag className="h-5 w-5" /> Cart ({totalItems})
          </Button>

          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
