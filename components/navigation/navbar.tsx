"use client"

import React, { useCallback, useEffect, useState, memo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/logo"
import { useRouter } from "next/navigation"
import { HamburgerButton } from "@/components/ui/hamburger-button"

// Extracting static data to outside the component to prevent re-creation
const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" }
]

// Define the custom button styles to match the CTA in AiMarketAnalystHero
const ctaButtonStyles =
  "rounded-lg bg-slate-900 px-6 py-2 text-base font-semibold text-white shadow-md transition-shadow duration-200 ease-in-out hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

// Specific style for the "Join Waitlist" button to ensure it has a black background
const waitlistButtonStyles =
  "rounded-lg !bg-black px-6 py-2 text-base font-semibold !text-white shadow-md transition-shadow duration-200 ease-in-out hover:!bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

// Memoized MenuItem component for better performance
const MenuItem = memo(
  ({
    item,
    onClick
  }: {
    item: { name: string; href: string }
    onClick?: () => void
  }) => (
    <li>
      <Link
        href={item.href}
        onClick={onClick}
        className="text-muted-foreground hover:text-foreground block duration-150"
        prefetch={false}
      >
        <span>{item.name}</span>
      </Link>
    </li>
  )
)
MenuItem.displayName = "MenuItem"

// Memoized WaitlistButton component
const WaitlistButton = memo(
  ({ onClick, className }: { onClick: () => void; className?: string }) => (
    <button
      className={cn(waitlistButtonStyles, className)}
      data-navbar-button="true"
      data-waitlist-button="true"
      onClick={onClick}
    >
      <span>Join Waitlist</span>
    </button>
  )
)
WaitlistButton.displayName = "WaitlistButton"

export function Navbar() {
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Memoize handleScroll function to prevent recreation on each render
  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame for better performance with scroll events
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50)
    })
  }, [])

  // Memoize the navigation handler
  const handleNavigateToWaitlist = useCallback(() => {
    router.push("/waitlist")
  }, [router])

  // Combined navigation and menu close handler for mobile
  const handleMobileWaitlistClick = useCallback(() => {
    router.push("/waitlist")
    setMenuState(false)
  }, [router])

  // Toggle menu state handler
  const toggleMenu = useCallback((state: boolean) => {
    setMenuState(state)
  }, [])

  useEffect(() => {
    // Use passive event listener for improved scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check for scroll position on mount
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuState])

  return (
    <header className="absolute inset-x-0 top-0 w-full">
      <nav
        data-state={menuState ? "active" : "inactive"}
        className="group fixed z-50 w-full"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-4 transition-all duration-300 ease-in-out sm:mt-4 sm:px-6 lg:px-12",
            "rounded-2xl border border-transparent bg-white/10 backdrop-blur-md",
            isScrolled
              ? "mt-1 max-w-6xl border-slate-200/20 bg-white/25 py-1 shadow-lg backdrop-blur-xl lg:px-8"
              : "py-2 sm:py-3"
          )}
        >
          <div
            className={cn(
              "relative flex items-center justify-between gap-6 lg:gap-0",
              isScrolled ? "py-1 sm:py-2" : "py-2 lg:py-4"
            )}
          >
            <div className="flex items-center lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
                prefetch={false}
              >
                <Logo />
              </Link>
            </div>

            <div className="relative z-20 block lg:hidden">
              <HamburgerButton
                open={menuState}
                setOpen={toggleMenu}
                className="relative z-20"
              />
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
              </ul>
            </div>

            {/* Desktop Buttons (Hidden on mobile) */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              {!isScrolled ? (
                <>
                  <button
                    className={cn(
                      ctaButtonStyles,
                      "bg-transparent text-slate-900 shadow-none hover:bg-slate-100",
                      "border border-slate-300"
                    )}
                  >
                    <span>Login</span>
                  </button>
                  <WaitlistButton onClick={handleNavigateToWaitlist} />
                </>
              ) : (
                <WaitlistButton onClick={handleNavigateToWaitlist} />
              )}
            </div>

            {/* Mobile Menu Overlay & Content - Only render when needed */}
            {menuState && (
              <div
                className={cn(
                  "lg:hidden",
                  "absolute inset-x-0 top-full",
                  "w-full",
                  "mt-2",
                  "flex flex-col items-center",
                  "rounded-lg border",
                  "bg-white shadow-lg",
                  "p-6"
                )}
              >
                {/* Mobile Menu Items */}
                <div className="mb-6 w-full">
                  <ul className="space-y-6 text-base">
                    {menuItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        item={item}
                        onClick={() => setMenuState(false)}
                      />
                    ))}
                  </ul>
                </div>

                {/* Mobile Action Buttons Container */}
                <div className="flex w-full flex-col space-y-3">
                  {!isScrolled && (
                    <button
                      className={cn(
                        ctaButtonStyles,
                        "bg-transparent text-slate-900 shadow-none hover:bg-slate-100",
                        "border border-slate-300"
                      )}
                    >
                      <span>Login</span>
                    </button>
                  )}
                  <WaitlistButton onClick={handleMobileWaitlistClick} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
