import styled from '@emotion/styled';

export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  background-color: #eee;
  cursor: pointer;
  padding: 18px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

type ContentProps = {
  open: boolean;
};

export const Content = styled.div<ContentProps>((props) => ({
  padding: '18px 0',
  display: props.open ? 'block' : 'none',
}));
