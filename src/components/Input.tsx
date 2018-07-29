import React from 'react'

type Props = {
  autoFocus?: boolean
  className?: string
  onBlur?(): void
  onChange?(value: string): void
  onKeyDown?(keycode: number): void
  placeholder?: string
  value: string
}

export let Input: React.StatelessComponent<Props> = ({
  autoFocus, className, onBlur, onChange, onKeyDown, placeholder, value
}) =>
  <input
    autoFocus={autoFocus}
    className={className}
    onBlur={() => onBlur && onBlur()}
    onChange={e => onChange && onChange(e.currentTarget.value)}
    onKeyDown={e => onKeyDown && onKeyDown(e.which)}
    placeholder={placeholder}
    value={value}
  />
