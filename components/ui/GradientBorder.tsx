import { cn } from '@/lib/utils'
import React from 'react'

export function GradientBorder({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
        className={cn('p-px rounded-lg bg-gradient-to-b from-secondary to-transparent', className)}
        {...props}
        />
    )
}
