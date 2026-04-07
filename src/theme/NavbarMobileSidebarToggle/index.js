import React from 'react'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'

function HamburgerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="3.5"  width="16" height="1.75" rx="0.875" fill="currentColor" />
      <rect x="1" y="8.12" width="10" height="1.75" rx="0.875" fill="currentColor" />
      <rect x="1" y="12.75" width="13" height="1.75" rx="0.875" fill="currentColor" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4L14 14M14 4L4 14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function NavbarMobileSidebarToggle() {
  const { toggle, shown } = useNavbarMobileSidebar()

  return (
    <button
      onClick={toggle}
      aria-label={
        shown
          ? translate({
              id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
              message: 'Close navigation menu',
            })
          : translate({
              id: 'theme.navbar.mobileNavButton.ariaLabel',
              message: 'Toggle navigation menu',
            })
      }
      aria-expanded={shown}
      className="navbar__toggle clean-btn"
      type="button"
    >
      {shown ? <CloseIcon /> : <HamburgerIcon />}
    </button>
  )
}
