import Wrapper from "../assets/wrappers/RecipeInfo";

const RecipeInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="recipe-icon">{icon}</span>
      <p className="recipe-text">{text}</p>
    </Wrapper>
  );
};

export default RecipeInfo;
