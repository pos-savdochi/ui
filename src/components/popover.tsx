"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import {
  mergeRefs,
  TopLayerHostProvider,
  useTopLayerContainer,
  useTopLayerTrigger,
} from "@savdochi-uz/ui/lib/top-layer"
import { cn } from "@savdochi-uz/ui/lib/utils"

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  // Provides the "which dialog hosts us" answer to trigger + content below.
  return (
    <TopLayerHostProvider>
      <PopoverPrimitive.Root data-slot="popover" {...props} />
    </TopLayerHostProvider>
  )
}

function PopoverTrigger({
  ref,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const claim = useTopLayerTrigger()
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      ref={mergeRefs(ref, claim)}
      {...props}
    />
  )
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  // A native modal <dialog> (e.g. the settings modal, the new-debtor modal)
  // lives in the browser's TOP LAYER, which paints above everything portalled
  // to <body> — so a body-portalled popover would open BEHIND the dialog and
  // read as "nothing happened". Portal into the dialog the TRIGGER lives in so
  // it shares the top layer; <body> when there is none. See lib/top-layer for
  // why this is not a `document.querySelector("dialog[open]")` during render.
  // Mirrors select.tsx.
  const container = useTopLayerContainer()

  return (
    <PopoverPrimitive.Portal container={container}>
      {/* No box-shadow — theme.md reserves the one drop-shadow for product
          imagery; floating surfaces read via the hairline border + surface. */}
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-xl border p-1 outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ref,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  // An anchored popover may have no trigger of its own — the anchor is then the
  // element that knows which dialog (if any) hosts the popover.
  const claim = useTopLayerTrigger()
  return (
    <PopoverPrimitive.Anchor
      data-slot="popover-anchor"
      ref={mergeRefs(ref, claim)}
      {...props}
    />
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
