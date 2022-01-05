import React, { useEffect, useState, useContext } from 'react';
import { apiDrinkCategories, drinkApiDidMount } from '../servicesContext/drinksAPI';
import DrinksAndFoodsContext from '../context/Foods&Drinks';

export default function DrinkCategories() {
  const [drinkCategories, setDrinkCategories] = useState('');
  const [buttonsDrinksArray, setButtonDrinksArray] = useState([]);
  const [lastDrinkCategory, setLastDrinkCategory] = useState('');
  const { setDrinks } = useContext(DrinksAndFoodsContext);
  const FIVE = 5;

  useEffect(() => {
    apiDrinkCategories(setDrinkCategories);
  }, [setDrinkCategories]);

  async function handleOnClick(e) {
    let category = e.target.value;

    if (category === lastDrinkCategory) {
      category = 'All';
    }

    setLastDrinkCategory(category);

    if (category === 'All') {
      setButtonDrinksArray(['All']);

      drinkApiDidMount(setDrinks);
      return;
    }

    setButtonDrinksArray([category]);

    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json());

    setDrinks(result.drinks);
  }

  function activeBtn(strCategory) {
    const active = buttonsDrinksArray
      .find((btn) => btn === strCategory);
    return active ? 'category-btn active-btn' : 'category-btn';
  }

  return (
    <div>
      <button
        data-testid="All-category-filter"
        value="All"
        type="button"
        onClick={ handleOnClick }
      >
        All
      </button>
      { drinkCategories && drinkCategories.slice(0, FIVE).map(({ strCategory }) => {
        console.log(drinkCategories);
        return (
          <button
            data-testid={ `${strCategory}-category-filter` }
            className={ activeBtn(strCategory) }
            type="button"
            value={ strCategory }
            key={ strCategory }
            onClick={ handleOnClick }
          >
            {strCategory}
          </button>
        );
      }) }
    </div>
  );
}