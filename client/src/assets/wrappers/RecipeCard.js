import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 550px;
  box-sizing: border-box;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--grey-100);
  }

  .main-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-right: 1rem;
    text-transform: uppercase;
  }

  .info {
    flex: 1 1 0;
    min-width: 0;
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .content {
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .content-center {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin: 1rem 0;
    align-items: center;
  }

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Wrapper;
