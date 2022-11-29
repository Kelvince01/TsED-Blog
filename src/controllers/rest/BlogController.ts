import { Controller, Inject } from "@tsed/di";
import { Get, Post, Put, Delete } from "@tsed/schema";
import { BlogService } from "src/services/BlogService";
import { BlogModel } from "src/models/BlogModel";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { MultipartFile, PlatformMulterFile } from "@tsed/common";

@Controller("/blog")
export class BlogController {
  constructor(@Inject(BlogService) private blogService: BlogService) { }

  @Get("/")
  get(): Promise<BlogModel[]> {
    return this.blogService.getAll();
  }

  @Post("/")
  create(@MultipartFile("file") file: PlatformMulterFile, @BodyParams() blog: BlogModel): Promise<BlogModel> {
    blog.coverImage = file.filename;
    return this.blogService.create(blog);
  }

  @Get("/:id")
  getOne(@PathParams("id") id: string): Promise<BlogModel> {
    return this.blogService.getById(id);
  }

  @Put("/:id")
  update(@PathParams("id") id: string, @BodyParams() blog: BlogModel): Promise<BlogModel> {
    return this.blogService.update(id, blog);
  }

  @Delete("/:id")
  delete(@PathParams("id") id: string): Promise<BlogModel> {
    return this.blogService.delete(id);
  }
}