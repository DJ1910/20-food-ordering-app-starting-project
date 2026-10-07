import MealItem from "./MealItem.jsx";
import ErrorBox from "./ErrorBox.jsx";
import useHttp from "../hooks/useHttp.jsx";

const config = {};

export default function Meals() {
  const {
    data: availableMeals,
    isLoading,
    fetchError,
  } = useHttp("http://localhost:3000/meals", config, []);

  if (isLoading) {
    return <p className="center">Fetching available meals...</p>;
  }

  return (
    <>
      {fetchError && <ErrorBox title="Error" message={fetchError} />}
      {!fetchError && (
        <ul id="meals">
          {availableMeals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <MealItem {...meal} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
