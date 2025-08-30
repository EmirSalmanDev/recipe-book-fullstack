import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1 1 0;

  .recipe-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    svg {
      color: var(--text-secondary-color);
    }
  }

  .recipe-text {
    display: block;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 500px) {
    .recipe-text {
      font-size: 0.85rem;
    }
  }
`;

export default Wrapper;
