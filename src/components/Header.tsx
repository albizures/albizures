import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
// import Image from 'next/image';
import ExternalIcon from 'remixicon/icons/System/external-link-line.svg';
import MenuIcon from 'remixicon/icons/System/menu-line.svg';
import CloseIcon from 'remixicon/icons/System/close-line.svg';
import anyConfig from '../../config.yml';
import { Config } from '../types';

const config = anyConfig as Config;

export function Header() {
	const [menuIsOpen, setMenuIsOpen] = React.useState(false);

	function onClick() {
		setMenuIsOpen(!menuIsOpen);
	}

	return (
		<header className="p-2 md:px-0 border-b border-gray-800 relative">
			<div className="container px-2 max-w-screen-md flex justify-between items-center mx-auto">
				<h2 className="text-xl">
					<Link href="/">
						<a className="text-primary">{config.site.title}</a>
					</Link>
				</h2>
				<button className="md:hidden" onClick={onClick}>
					{menuIsOpen ? (
						<CloseIcon className="m-0 icon icon-big text-primary-focus opacity-70 hover:opacity-100" />
					) : (
						<MenuIcon className="m-0 icon icon-big text-primary-focus opacity-70 hover:opacity-100" />
					)}
				</button>
				<nav
					className={cls(
						{ hidden: !menuIsOpen },
						'absolute top-full z-10 w-full left-0',
						'md:static md:left-auto md:w-auto md:block',
						'shadow-white md:shadow-none',
					)}
				>
					<ul className="flex flex-col md:flex-row">
						{config.pages
							.filter((link) => link.asTopLink)
							.map((link, index) => {
								return (
									<li
										key={index}
										className="capitalize ml-1 mb-2 md:my-0 p-1 text-sm text-primary-focus opacity-70 hover:opacity-100"
									>
										<Link href={link.url}>
											<a className="whitespace-nowrap">
												{link.label}
												{link.external && (
													<ExternalIcon className="ml-1 icon inline-block align-text-bottom " />
												)}
											</a>
										</Link>
									</li>
								);
							})}
					</ul>
				</nav>
			</div>
		</header>
	);
}
