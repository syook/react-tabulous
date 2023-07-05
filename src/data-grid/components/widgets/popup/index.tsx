import { type FC, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { createPopper, type Placement } from '@popperjs/core';

import { useClickAwayListener } from '../../../hooks/useClickAwayListener';

const StyledPopup = styled.div((props: any) => ({
	zIndex: 100,
	padding: props.noPadding === true ? 0 : 8,
	// boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.2)',
	borderRadius: 4,
	backgroundColor: '#fff',
	fontFamily: 'var(--font-family, Roboto, Helvetica, Arial, sans-serif)',
	boxShadow:
		'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'
}));

type PopupProps = React.HTMLAttributes<HTMLDivElement> & {
	open?: boolean;
	trigger: ReactNode;
	children: ReactNode;
	placement?: Placement;
	noPadding?: boolean;
	onClose?: () => void;
};

export const Popup: FC<PopupProps> = ({
	open = false,
	trigger,
	children,
	placement = 'top-start',
	noPadding = false,
	onClose = () => {}
}) => {
	const popperRef = useRef(null);
	const triggerRef = useRef(null);

	const [visible, setVisible] = useState(open);

	useEffect(() => {
		setVisible(open);
	}, [open]);

	const { isFocused } = useClickAwayListener(popperRef);

	useEffect(() => {
		if (isFocused === false) {
			setVisible(false);
			onClose();
		}
	}, [isFocused, onClose]);

	useEffect(() => {
		if (!visible || !triggerRef.current || !popperRef.current) return;

		createPopper(triggerRef.current, popperRef.current, {
			placement,
			modifiers: [{ name: 'offset', options: { offset: [0, 10] } }]
		});
	}, [placement, visible]);

	return (
		<>
			<div
				ref={triggerRef}
				className="popupTrigger"
				data-active={visible}
				onClick={() => {
					setVisible(!visible);
				}}
			>
				{trigger}
			</div>
			{visible &&
				createPortal(
					<StyledPopup ref={popperRef} noPadding={noPadding}>
						{children}
					</StyledPopup>,
					document.body
				)}
		</>
	);
};
