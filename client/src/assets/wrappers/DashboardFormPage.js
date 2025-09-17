import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
    grid-template-columns: 1fr;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }

  .form-row-ingredients {
    display: grid;
  }

  .ingredient-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .ingredient-row:last-child {
    margin-bottom: 0;
  }

  .ingredient-row-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    padding: 0;

    border: none;
    background: transparent;
    cursor: pointer;
    background-color: var(--primary-color);
  }

  .ingredient-row-btn:hover {
    background: var(--primary-100);
    box-shadow: var(--shadow-3);
  }

  .full-width {
    grid-column: 1 / -1;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    /* .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    } */
  }
`;

export default Wrapper;
