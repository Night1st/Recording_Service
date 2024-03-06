import Link from "next/link"

import { cn } from "@/shared/utils/tailwind/functions"
import { buttonVariants } from "../../common/ui/button"
import { useRouter } from "next/router"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        isDisable: boolean
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const { asPath } = useRouter()
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    onClick={(e) => {
                        if (item.isDisable) e.preventDefault()
                    }}
                    key={item.href}
                    href={item.isDisable ? '' : item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        item.isDisable && 'cursor-not-allowed opacity-40',
                        asPath === item.href
                            ? "bg-foreground/10 font-semibold"
                            : "hover:bg-foreground/10 hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}