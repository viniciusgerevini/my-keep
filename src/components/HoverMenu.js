import React, { useEffect, forwardRef } from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.ul `
  position: absolute;
  padding: 5px 0px;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  z-index: 200;
  bottom: 40px;
  right: 10px;
  opacity: 0;
`;

const MenuItem = styled.li `
  cursor: pointer;
  padding: 5px 10px;
  background-color: ${props => props.theme.background};

  &:hover {
    background-color: ${props => props.theme.secondaryBackground};
  }
`;

function HoverMenu(props, ref) {
  const { items } = props;

  const executeAction = (e, action) => {
    e.stopPropagation();
    action();
  };

  useEffect(() => {
    const horizontalOffset = ref.current.getBoundingClientRect() * 0.7;
    ref.current.style.right = `-${horizontalOffset}px`;
    ref.current.style.opacity = 1;
  });

  return (<MenuWrapper ref={ref}>
    { items.map((item) => <MenuItem key={item.text} onClick={e => executeAction(e, item.action)}>{item.text}</MenuItem>)}
  </MenuWrapper>)
}

export default forwardRef(HoverMenu);
