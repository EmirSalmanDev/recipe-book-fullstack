import styled from "styled-components";

const Wrapper = styled.button`
  background: transparent;
  border-color: transparent;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  .toogle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;

export default Wrapper;
