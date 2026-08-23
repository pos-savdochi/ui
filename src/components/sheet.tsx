"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@savdochi-uz/ui/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

/** A side drawer (defaults to the right edge). Elevation comes from the overlay
 *  + a hairline border — no shadow (design/theme.md). Renders its own close
 *  button unless `showClose={false}`. */
function SheetContent({
  className,
  children,
  side = "right",
  showClose = true,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "right" | "left" | "bottom"
  showClose?: boolean
  closeLabel?: string
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Non-scrolling shell: the close stays pinned while an inner wrapper
          // scrolls. Side drawers: `max-w-[calc(100%-3rem)]` leaves a tappable
          // overlay strip on phones; sm+ caps at max-w-md. Bottom sheet: full
          // width, rounded top, height capped by the caller (or 85dvh default).
          "bg-card border-border data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col duration-200",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 w-full max-w-[calc(100%-3rem)] border-l sm:max-w-md",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 w-full max-w-[calc(100%-3rem)] border-r sm:max-w-md",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl border-t",
          className
        )}
        {...props}
      >
        {showClose ? (
          <SheetPrimitive.Close
            aria-label={closeLabel}
            className="text-muted-foreground hover:bg-foreground/5 hover:text-foreground focus-visible:ring-ring absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none print:hidden"
          >
            <X className="size-4" />
          </SheetPrimitive.Close>
        ) : null}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground text-[17px] font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetDescription,
}
