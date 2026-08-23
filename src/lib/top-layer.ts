"use client"

import * as React from "react"

/**
 * A native modal `<dialog>` lives in the browser's TOP LAYER: it paints above
 * everything portalled to `<body>`, so a body-portalled popover/select opened
 * from INSIDE a dialog is hidden behind it — the list "doesn't open".
 *
 * The fix is to portal into the hosting dialog so the floating layer shares the
 * top layer. Finding it with `document.querySelector("dialog[open]")` during
 * render does NOT work here:
 *
 *  1. **The React Compiler is on.** That call has no reactive inputs, so the
 *     compiler hoists it into the component's memo cache behind a
 *     `memo_cache_sentinel` — it runs exactly ONCE, on the first render. At
 *     that point the shell (PosModal) has not called `showModal()` yet (it does
 *     so in an effect), no dialog is open, the result is `null`, and `null` is
 *     cached for the component's whole life.
 *  2. A global query answers "some open dialog", not "the dialog this trigger
 *     lives in" — wrong for a page-level popover opened while a modal is up,
 *     and wrong for nested dialogs.
 *
 * So the TRIGGER reports its own `closest("dialog")` at commit time and the
 * content portals into it: no global query, no memoisation hazard, and no
 * reliance on the consumer re-rendering when the popover opens.
 *
 * (No JSX in this file on purpose — `@savdochi-uz/ui`'s exports map resolves
 * `./lib/*` to `./src/lib/*.ts`.)
 */
type TopLayerHost = {
  /** The `<dialog>` hosting the trigger — null when it sits on the page. */
  host: HTMLElement | null
  /** Ref callback for the trigger; records its host dialog on mount. */
  claim: (node: HTMLElement | null) => void
}

const TopLayerHostContext = React.createContext<TopLayerHost | null>(null)

/** Wraps a floating-UI root (Popover/Select) so trigger and content agree on
 *  which dialog — if any — hosts them. */
export function TopLayerHostProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [host, setHost] = React.useState<HTMLElement | null>(null)
  // Lazy state, not a ref: `claim` must keep ONE identity for the provider's
  // life. A fresh function each render would make React detach and reattach the
  // trigger ref on every render — with a setState inside, that is churn.
  const [claim] = React.useState(
    () => (node: HTMLElement | null) => setHost(node?.closest("dialog") ?? null)
  )
  return React.createElement(
    TopLayerHostContext.Provider,
    { value: { host, claim } },
    children
  )
}

/** Ref callback the trigger must carry — see `TopLayerHostProvider`. */
export function useTopLayerTrigger(): TopLayerHost["claim"] | undefined {
  return React.useContext(TopLayerHostContext)?.claim
}

/** Portal container for the floating content — `undefined` means `<body>`. */
export function useTopLayerContainer(): HTMLElement | undefined {
  return React.useContext(TopLayerHostContext)?.host ?? undefined
}

/** Attach several refs to one node — the trigger keeps whatever ref the caller
 *  passed and we only add ours. */
export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    }
  }
}
