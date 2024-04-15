import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getAll);
        this.router.post(`${this.path}/add`, this.addData);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.post(`${this.path}`, this.addPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(`${this.path}/:num`, this.getNElements);
        this.router.get(`${this.path}s`, this.getAllPosts);
        this.router.delete(`${this.path}s`, this.deleteAllPosts);
    }

    private getAll = async (request: Request, response: Response) => {
        response.status(200).json(testArr);
    };

    private addData = async (request: Request, response: Response) => {
        const { elem } = request.body;
        testArr.push(elem);
        response.status(200).json(testArr);
    };

    private getById = async (request: Request, response: Response) => {
        const { id } = request.params;
        const index = parseInt(id);
        if (isNaN(index) || index < 0 || index >= testArr.length) {
            response.status(400).send('Invalid id');
            return;
        }
        response.status(200).json(testArr[index]);
    };

    private addPost = async (request: Request, response: Response) => {
        const { elem } = request.body;
        testArr.push(elem);
        response.status(201).json(testArr);
    };

    private deletePost = async (request: Request, response: Response) => {
        const { id } = request.params;
        const index = parseInt(id);
        if (isNaN(index) || index < 0 || index >= testArr.length) {
            response.status(400).send('Invalid id');
            return;
        }
        testArr.splice(index, 1);
        response.status(200).json(testArr);
    };

    private getNElements = async (request: Request, response: Response) => {
        const { num } = request.params;
        const count = parseInt(num);
        if (isNaN(count) || count <= 0 || count > testArr.length) {
            response.status(400).send('Invalid number');
            return;
        }
        const elements = testArr.slice(0, count);
        response.status(200).json(elements);
    };

    private getAllPosts = async (request: Request, response: Response) => {
        response.status(200).json(testArr);
    };

    private deleteAllPosts = async (request: Request, response: Response) => {
        testArr = [];
        response.status(200).json(testArr);
    };
}

export default PostController;
