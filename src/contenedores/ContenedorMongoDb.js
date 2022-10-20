export default class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async add(object) {
        try {
            let elementCreated = await this.model.create(object);
            return elementCreated._id;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let elements = await this.model.find({}, { __v: 0 });
            return elements;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            let element = await this.model.findById(id, { __v: 0 });
            return element;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, objectToUpdate) {
        try {
            return await this.model.updateOne({ _id: id }, { $set: objectToUpdate });
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            return await this.model.deleteOne({ _id: id });
        } catch (error) {
            console.log(error);
        }
    }
}