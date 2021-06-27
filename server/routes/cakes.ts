const cakesData = [
  {
    id: "33a3d4f7-f98b-4ae7-ac44-b88e3c56e6f6",
    name: "Easy carrot cake",
    description: "Top this classic carrot cake with moreish icing and chopped walnuts or pecans. Serve as a sweet treat with a cup of tea any time of the day.",
    author: "John Smith",
    difficulty: "Very easy",
    effort: "One day",
    dateTime: new Date(2021, 1, 10, 8, 53)
  },
  {
    id: "851221b8-763a-4e46-80df-ada73af11a5f",
    name: "Classic Victoria sandwich recipe",
    description: "The perfect party cake, a Victoria sponge is a traditional bake everyone will love. Makes an easy wedding cake, too",
    author: "John Smith",
    difficulty: "Very easy",
    effort: "One day",
    dateTime: new Date(2021, 3, 10, 11, 42)
  }
];

export const getCakes = (req: any, res: any) => {
  const id = req.params.id;
  res.json(cakesData);
};

export const postCakes = (req: any, res: any) => {
  cakesData.push(req.body);
  res.json(req.body);
};

export const putCake = (req: any, res: any) => {
  res.send(
    `I received your PUT cake. This is what you sent me: ${req.body.put}`
  );
};

export const deleteCake = (req: any, res: any) => {
  const id = req.params.id;
  res.send(
    `I received your Delete request. Delete: ${id}`
  );
};