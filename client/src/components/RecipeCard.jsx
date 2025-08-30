import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RecipeCard";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import RecipeInfo from "./RecipeInfo";
day.extend(advancedFormat);

const RecipeCard = ({ createdAt, description, recipeStatus, title, _id }) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <RecipeInfo icon={<FaLocationArrow />} text={recipeStatus} />
          <RecipeInfo icon={<FaCalendarAlt />} text={date} />
          <RecipeInfo icon={<FaBriefcase />} text={recipeStatus} />
          <div className={`status ${recipeStatus}`}>{recipeStatus}</div>
          {/* BADGES değiştir main.css */}
        </div>

        <footer className="actions">
          <Link className="btn edit-btn">Edit</Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default RecipeCard;
