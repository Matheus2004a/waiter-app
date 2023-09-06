import { Item, List } from './styles';

export function ListIngredients() {
  return (
    <List>
      {Array(10).fill(0, 0).map((_, index) => (
        <Item key={index}>
          <span>🧀 Prato</span>
          <label htmlFor="plate">
            <input type="checkbox" name="plate" id="plate" />
          </label>
        </Item>
      ))}
    </List>
  );
}
