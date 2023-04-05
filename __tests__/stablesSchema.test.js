const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Stables = require("../Schema/stables");

let mongoServer;
let mongooseConnection;
let stables;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    mongooseConnection = mongoose.connection;
    stables = new Stables({
        name: "Test Stables",
        location: "Test Location",
        numberOfHorses: 10,
        owner: "Test Owner",

    });
});

afterAll(async () => {
    await mongooseConnection.close();
    await mongoServer.stop();
});

describe("Stables Schema/Model", () => {
    test("should return all stables documents", async () => {
        // save some stables instances
        const stables1 = new Stables({
            name: "Stables 1",
            location: "Location 1",
            owner: "Owner 1",
            numberOfHorses: 5,
        });
        await stables1.save();

        const stables2 = new Stables({
            name: "Stables 2",
            location: "Location 2",
            owner: "Owner 2",
            numberOfHorses: 10,
        });
        await stables2.save();

        const stables3 = new Stables({
            name: "Stables 3",
            location: "Location 3",
            owner: "Owner 3",
            numberOfHorses: 15,
        });
        await stables3.save();

        // find all stables documents
        const allStables = await Stables.find();

        // assert that all stables documents were returned
        expect(allStables.length).toBe(3);
        expect(allStables[0].name).toBe("Stables 1");
        expect(allStables[1].name).toBe("Stables 2");
        expect(allStables[2].name).toBe("Stables 3");
    });
    test("should find a stables instance by id", async () => {
        // save a new stables instance
        const savedStables = await stables.save();

        // find the stables instance by id
        const foundStables = await Stables.findById(savedStables._id);

        // assert that the stables instance was found
        expect(foundStables._id.toString()).toEqual(savedStables._id.toString());
        expect(foundStables.name).toEqual(savedStables.name);
        expect(foundStables.location).toEqual(savedStables.location);
        expect(foundStables.owner).toEqual(savedStables.owner);
        expect(foundStables.numberOfHorses).toEqual(savedStables.numberOfHorses);
    });
    test("should save a new stables instance", async () => {
        const savedStables = await stables.save();
        expect(savedStables._id).toBeDefined();
        expect(savedStables.name).toBe("Test Stables");
        expect(savedStables.location).toBe("Test Location");
        expect(savedStables.owner).toBe("Test Owner");
        expect(savedStables.numberOfHorses).toBe(10);
    });

    test("should not save stables instance with missing required fields", async () => {
        const incompleteStables = new Stables({
            name: "Incomplete Stables",
            location: "Incomplete Location",
            owner: "Incomplete Owner",
        });
        await expect(incompleteStables.save()).rejects.toThrow();
    });
    test("should not save stables instance with invalid numberOfHorses input", async () => {
        expect.assertions(3);

        const invalidStables = new Stables({
            name: "Valid name",
            location: "Valid location",
            numberOfHorses: "Invalid numberOfHorses",
            owner: "Valid owner"
        });
        try {
            await invalidStables.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(error.errors.numberOfHorses).toBeDefined();
            expect(error.errors.numberOfHorses.kind).toBe("Number");
        }
    });
    test("should update an existing stables instance", async () => {
        // save a new stables instance
        const savedStables = await stables.save();

        // update the stables instance
        savedStables.name = "Updated Test Stables";
        savedStables.numberOfHorses = 15;
        const updatedStables = await savedStables.save();

        // assert that the stables instance was updated
        expect(updatedStables.name).toBe("Updated Test Stables");
        expect(updatedStables.numberOfHorses).toBe(15);
    });
    test("should delete an existing stables instance", async () => {
        // save a new stables instance
        const savedStables = await stables.save();

        // delete the stables instance
        const deletedStables = await Stables.findByIdAndDelete(savedStables._id);

        // assert that the stables instance was deleted
        expect(deletedStables._id.toString()).toEqual(savedStables._id.toString());
    });
});