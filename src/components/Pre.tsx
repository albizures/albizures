import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import classNames from 'classnames';

interface LineProps {
	className?: string;
	noLineNumbers?: boolean;
	highlight?: boolean;
	style?: React.StyleHTMLAttributes<HTMLDivElement>;
	numLine: number;
}

const Line: React.FC<LineProps> = (props) => {
	const {
		noLineNumbers = true,
		highlight = false,
		numLine,
		children,
		style = {},
		className = '',
	} = props;

	return (
		<div
			style={style}
			className={classNames(`${className} table-row leading-5`, {
				'border-l-2 border-base-content bg-neutral-focus': highlight,
			})}
		>
			{!noLineNumbers && (
				<div className="table-cell text-right pl-4 font-light select-none opacity-40 text-primary">
					{numLine}
				</div>
			)}
			<div className="table-cell pl-4">{children}</div>
		</div>
	);
};

interface Properties {
	children: string;
	noLineNumbers?: boolean;
	title?: string;
	lines?: string;
}

interface Props {
	children: {
		props: {
			children: string;
			noLineNumbers?: boolean;
			title?: string;
			lines?: string;
		};
	};
}

const parseLines = (raw: string) => {
	try {
		const linesOrRange = JSON.parse(raw) as string[];
		return linesOrRange.reduce((result, current) => {
			if (typeof current === 'number') {
				result.push(current);
			} else if (typeof current === 'string') {
				result.push(...rangeToNumber(current));
			}

			console.log({ result });

			return result;
		}, [] as number[]);
	} catch (error) {
		throw new Error(
			`Invalid lines to be highlight!\n\tvalue="${raw}"`,
		);
	}
};

const rangeToNumber = (range: string) => {
	const nums = range
		.split('-')
		.map((n) => Number.parseInt(n))
		.filter((n) => !Number.isNaN(n));

	if (nums.length !== 2) {
		return nums;
	}
	const [min, max] = nums;

	for (let index = min + 1; index < max; index++) {
		nums.push(index);
	}

	return nums;
};

export const Pre: React.FC<Props> = (props) => {
	// TODO support more languages
	const {
		children,
		noLineNumbers = false,
		title,
		lines: linesOrRange = '[]',
	} = props.children.props as Properties;

	const lines = parseLines(linesOrRange);

	return (
		<Highlight
			{...defaultProps}
			code={children.trim()}
			language="jsx"
			theme={theme}
		>
			{({
				className,
				style,
				tokens,
				getLineProps,
				getTokenProps,
			}) => (
				<pre className={className} style={style}>
					{title ? (
						<div className="opacity-50 mb-3 text-primary px-4 py-2 bg-neutral-focus">
							{title}
						</div>
					) : (
						<div className="mb-4 w-full">{/*just space*/}</div>
					)}
					{tokens.map((line, i) => {
						const lineProps = getLineProps({ line, key: i });
						const numLine = i + 1;
						return (
							<Line
								key={i}
								{...lineProps}
								noLineNumbers={noLineNumbers}
								numLine={i + 1}
								highlight={lines.includes(numLine)}
							>
								{line.map((token, key) => {
									return <span {...getTokenProps({ token, key })} />;
								})}
							</Line>
						);
					})}
				</pre>
			)}
		</Highlight>
	);
};
