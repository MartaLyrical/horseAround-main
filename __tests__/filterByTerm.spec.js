describe("Filter function", () => {
    test("It should pull up a list of all the diets in the data base.", () => {
        const getAll = async (req, res) => {
            const allDiet = await dietSchema.find();
            res.status(200).json(allDiet);
          };
    });
  });

describe("Filter function", () => {
    test("This should only get one diet by ID number from the data base.", () => {
        const getSingle = async (req, res) => {
            const diet = await dietSchema.findById("640c9c6f4be6e1bbfa31a315");
          
            if (!diet) {
              // throw new Error('ID not found');
              res.status(500).json("ID not found. Try again.");
            }
          
            res.status(200).json(diet);
          };
    });
});

//   {
//     "feedtype": "testing feed",
//     "brand": "Testing Brand",
//     "product": "Texas Testing Tastees",
//     "source": "Dan Testing Food",
//     "price": 49.99,
//     "size": 50,
//     "deliveryTime": 5,
//     "benefits": [
//       "This is the first benefit",
//       "There is a second benefit",
//       "I couldn't think of a third"
//     ]
//   }
  
// {
//     "feedtype": "new testing feed",
//     "brand": "New Testing Brand",
//     "product": "Texas Testing Tastees",
//     "source": "Dan Testing Food",
//     "price": 99.99,
//     "size": 50,
//     "deliveryTime": 5,
//     "benefits": [
//       "This is the first benefit",
//       "There is a second benefit",
//       "I couldn't think of a third",
//       "This shows an update"
//     ]
//   }
