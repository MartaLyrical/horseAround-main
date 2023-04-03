describe("Filter function", () => {
    test("It should pull up a list of all the diets in the data base.", () => {
        const getAll = async (req, res) => {
            const allDiet = await dietSchema.find();
            res.status(200).json(allDiet);
          };
    });
  });
