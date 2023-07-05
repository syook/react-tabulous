import { render, screen } from '@testing-library/react';
import { Button, Icon } from '../../../../../reactTabulous/components/widgets';

describe('Button', () => {
	test('should render correctly', () => {
		render(<Button>Submit</Button>);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly when disabled', () => {
		render(<Button disabled>Submit</Button>);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly when loading', () => {
		render(<Button loading>Submit</Button>);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});

	test('should render correctly when icon is passed', () => {
		render(<Button icon={<Icon name="download" />}>Submit</Button>);
		const container = screen.getByRole('button');
		expect(container).toBeInTheDocument();
	});
});
