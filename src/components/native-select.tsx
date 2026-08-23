"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@savdochi-uz/ui/lib/utils"

/**
 * A plain `<select>` styled like {@link SelectTrigger}.
 *
 * Use this INSIDE a native modal `<dialog>` (the settings modal). A portalled
 * Radix menu has to be re-parented into the open dialog to share the browser's
 * top layer, and that reparenting is fragile: if the query picks the wrong
 * dialog — or the dialog is not `open` yet at first render — the menu lands in
 * the inert part of the document, so it cannot be opened or clicked and the
 * click reaches the backdrop, which closes the modal. A native select has no
 * portal at all: the OS renders the popup above everything, on desktop and
 * mobile alike, and it can never dismiss the dialog.
 *
 * Outside a modal dialog prefer the richer Radix `Select` (custom item markup,
 * search, sections).
 */
export function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative inline-flex w-full items-center">
      <select
        data-slot="native-select"
        className={cn(
          "w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-9 text-[14px] text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 size-4 text-muted-foreground opacity-70"
      />
    </div>
  )
}
