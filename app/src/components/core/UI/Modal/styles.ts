import styled from '@emotion/styled';

export const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  border-radius: 4px;
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalBody = styled.div`
  padding: 1em;
  margin-top: 2em;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;
