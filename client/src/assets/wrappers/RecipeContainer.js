import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  width: 100%;

  h2 {
    text-transform: none;
  }

  .recipes {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    > * {
      box-sizing: border-box;
    }
  }
`;

export default Wrapper;
