import React, { forwardRef, Ref } from "react";
import Link, { LinkProps } from "next/link";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@material-ui/core";
import { useRouter } from "next/router";

interface Props extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
    activeClassName?: string;
}
type LinkRef = HTMLAnchorElement;
type NextLinkProps = Omit<MuiLinkProps, "href" | "classes"> &
    Pick<LinkProps, "href" | "as" | "prefetch"> &
    Props;

const active = "link-active";
const ActiveLink = (
    { href, as, prefetch, activeClassName = active, ...props }: NextLinkProps,
    ref: Ref<LinkRef>
) => {
    const { asPath } = useRouter();
    const childClassName = activeClassName || active;

    const className =
        asPath === href || asPath === as ? `${childClassName}`.trim() : null;

    return (
        <Link href={href} as={as} prefetch={prefetch} passHref>
            <MuiLink ref={ref} className={className} {...props} />
        </Link>
    );
};
export default forwardRef<LinkRef, NextLinkProps>(ActiveLink);
