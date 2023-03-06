interface LogoProps {
	className?: string
	pathClassName?: string
}

export default function Logo({ className, pathClassName }: LogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			data-name="Layer 1"
			viewBox="0 0 512 512"
			className={className}
		>
			<path
				d="M444.61 21.47 405.36 64h-34.84L425.8 4.11a12.8 12.8 0 0 1 18.81 17.36ZM62.22 130.62l32.25 35.78h151a38.36 38.36 0 0 1 51.32-22.48L370.52 64h-279c-35.27 0-53.52 41.39-29.3 66.62ZM420.47 64h-15.11l-89.81 97.29a38.11 38.11 0 0 1 2.21 5.11h99.76l32.25-35.78C474 105.39 455.75 64 420.47 64Zm-140.7 255.23L394.45 192h-76.68a38.35 38.35 0 0 1-72.34 0H117.55l114.68 127.23a31.87 31.87 0 0 0 11 7.91V486.4h-64a12.8 12.8 0 1 0 0 25.6H332.8a12.8 12.8 0 1 0 0-25.6h-64V327.14a31.87 31.87 0 0 0 10.97-7.91Z"
				className={pathClassName}
			/>
		</svg>
	)
}
