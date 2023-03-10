import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { LikeDislikeDTO, LikesDislikesInputDTO } from "../dtos/LikesDislikesDTO"
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPosts = async (req: Request, res: Response) => {
        try {

            const input: GetPostInputDTO = {
                token: req.headers.authorization
            }

           const output = await this.postBusiness.getPosts(input)

           res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {

            const postDTO = new PostDTO()

            const input = postDTO.createPostInput(
                req.body.content,
                req.headers.authorization
            )

            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const postDTO = new PostDTO()

            const input = postDTO.editPostInput(
                req.params.id,
                req.headers.authorization,
                req.body.content
            )

            const output = await this.postBusiness.editPost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {

            const postDTO = new PostDTO()

            const input = postDTO.deletePostInput(
                req.params.id,
                req.headers.authorization
            )
               
            const output = await this.postBusiness.deletePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {

            const likeDislikeDTO = new LikeDislikeDTO()

            const input = likeDislikeDTO.likesDislikesPostInput(
                req.params.id,
                req.headers.authorization,
                req.body.like
            )

            const output = await this.postBusiness.likeOrDislikePost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}