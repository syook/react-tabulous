import styled from '@emotion/styled';

const StyledSvg = styled.svg({
	circle: {
		stroke: 'currentColor',
		strokeDasharray: '80px, 200px',
		strokeDashoffset: 0,
		animation: 'loading 2s linear infinite'
	},
	'@keyframes loading': {
		'0%': { strokeDasharray: '1px, 200px', strokeDashoffset: 0 },
		'50%': { strokeDasharray: '100px, 200px', strokeDashoffset: -15 },
		'100%': { strokeDasharray: '100px, 200px', strokeDashoffset: -125 }
	}
});

export const Loader = () => {
	return (
		<StyledSvg viewBox="22 22 44 44" role="img">
			<circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
		</StyledSvg>
	);
};
