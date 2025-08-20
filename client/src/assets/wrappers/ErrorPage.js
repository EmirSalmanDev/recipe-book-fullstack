import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.75;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }
  a {
    color: var(--primary-color);
    text-transform: capitalize;
  }
`;

export default Wrapper;
