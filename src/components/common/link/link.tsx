import React, { PropsWithChildren } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import Button, { ButtonProps } from '@mui/material/Button';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import cx from 'classnames';

import styles from './styles.module.scss';

interface NextLinkComposedProps
	extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'>,
		Omit<NextLinkProps, 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
	noStyles?: boolean;
	activeClassName?: string;
	className?: string;
}

const NextLinkComposed = React.forwardRef<
	HTMLAnchorElement,
	PropsWithChildren<NextLinkComposedProps>
>(function NextLinkCommon(props, ref) {
	const {
		href,
		as,
		replace,
		scroll,
		shallow,
		prefetch,
		locale,
		children,
		passHref,
		noStyles,
		className,
		...other
	} = props;

	const linkClassName = cx({
		[styles.noStylesLink]: !!noStyles,
		[className as string]: true,
	});

	return (
		<NextLink
			{...{
				href,
				prefetch,
				as,
				replace,
				scroll,
				shallow,
				locale,
				passHref,
			}}
		>
			<a className={linkClassName} {...other} ref={ref}>
				{children}
			</a>
		</NextLink>
	);
});

interface LinkProps
	extends NextLinkComposedProps,
		Pick<ButtonProps, 'color' | 'size' | 'fullWidth'> {
	type?: 'button' | 'link';
	variant?: ButtonProps['variant'] & MuiLinkProps['variant'];
	disableGutters?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(function LinkCommon(
	props,
	ref
) {
	const {
		activeClassName = '',
		color,
		as,
		type,
		className: classNameProps,
		noStyles,
		disableGutters,
		href,
		locale,
		prefetch,
		replace,
		scroll,
		shallow,
		children,
		passHref,
		...other
	} = props;

	const router = useRouter();
	const pathname = typeof href === 'string' ? href : href.pathname;
	const className = cx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
		[styles.disableGutters]: disableGutters,
	});

	const nextjsProps = {
		href: href as ButtonProps['href'],
		as,
		replace,
		scroll,
		shallow,
		prefetch,
		locale,
		passHref,
	};

	const otherProps = {
		color,
		component: NextLinkComposed,
		className,
		ref,
		...other,
	};

	if (noStyles) {
		return (
			<NextLinkComposed
				{...{ ...nextjsProps, className, noStyles, href: href as NextLinkProps['href'] }}
			>
				{children}
			</NextLinkComposed>
		);
	}

	switch (type) {
		case 'link':
			return (
				<MuiLink {...nextjsProps} {...otherProps}>
					{children}
				</MuiLink>
			);
		case 'button':
			return (
				<Button {...nextjsProps} {...otherProps}>
					{children}
				</Button>
			);
		default:
			return (
				<Button {...nextjsProps} {...otherProps}>
					{children}
				</Button>
			);
	}
});

export default Link;
