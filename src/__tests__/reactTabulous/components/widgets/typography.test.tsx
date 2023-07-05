import { render, screen } from '@testing-library/react';
import { Typography } from '../../../../reactTabulous/components/widgets';

describe('Typography', () => {
	test('should render correctly', () => {
		render(<Typography>Hello</Typography>);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant', () => {
		render(<Typography variant="h1">Hello</Typography>);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element', () => {
		render(
			<Typography variant="h1" element="h1">
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className', () => {
		render(
			<Typography variant="h1" element="h1" className="test">
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align', () => {
		render(
			<Typography variant="h1" element="h1" className="test" align="center">
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align and htmlFor', () => {
		render(
			<Typography variant="h1" element="h1" className="test" align="center" htmlFor="test">
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align and htmlFor and color', () => {
		render(
			<Typography
				variant="h1"
				element="h1"
				className="test"
				align="center"
				htmlFor="test"
				color="primary"
			>
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align and htmlFor and color and style', () => {
		render(
			<Typography
				variant="h1"
				element="h1"
				className="test"
				align="center"
				htmlFor="test"
				color="primary"
				style={{ color: 'red' }}
			>
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align and htmlFor and color and style and props', () => {
		render(
			<Typography
				variant="h1"
				element="h1"
				className="test"
				align="center"
				htmlFor="test"
				color="primary"
				style={{ color: 'red' }}
				data-testid="test"
			>
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});

	test('should render correctly with variant and element and className and align and htmlFor and color and style and props and children', () => {
		render(
			<Typography
				variant="h1"
				element="h1"
				className="test"
				align="center"
				htmlFor="test"
				color="primary"
				style={{ color: 'red' }}
				data-testid="test"
			>
				Hello
			</Typography>
		);
		const container = screen.getByText(/hello/i);
		expect(container).toBeInTheDocument();
	});
});
