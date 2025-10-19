'use client'

import * as React from 'react'
import { Moon, Sun, Monitor, Check } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by only rendering after component mounts
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Get the current display theme (respects system theme)
  const getDisplayTheme = () => {
    if (!mounted) return 'system'
    return theme === 'system' ? systemTheme : theme
  }

  const displayTheme = getDisplayTheme()

  // Render a disabled button during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        className="w-9 h-9"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const getThemeIcon = () => {
    switch (displayTheme) {
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark'
      case 'light':
        return 'Light'
      case 'system':
        return 'System'
      default:
        return 'System'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 relative transition-all duration-200 hover:scale-105"
          aria-label={`Current theme: ${getThemeLabel()}. Click to change theme.`}
        >
          {getThemeIcon()}
          <span className="sr-only">Open theme menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="flex items-center justify-between cursor-pointer py-2"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          {theme === 'light' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="flex items-center justify-between cursor-pointer py-2"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
          {theme === 'dark' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="flex items-center justify-between cursor-pointer py-2"
        >
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </div>
          {theme === 'system' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}