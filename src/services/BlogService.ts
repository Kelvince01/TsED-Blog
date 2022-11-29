import { Injectable } from "@tsed/di";
import { Inject } from "@tsed/di";
import { MYSQL_DATA_SOURCE } from "src/datasources/MysqlDatasource";
import { DataSource } from "typeorm";
import { BlogModel } from "../models/BlogModel";

@Injectable()
export class BlogService {
    constructor(@Inject(MYSQL_DATA_SOURCE) private dataSource: DataSource) { }

    async getAll(): Promise<BlogModel[]> {
        return await this.dataSource.getRepository(BlogModel).find();
    }

    async create(blog: BlogModel): Promise<BlogModel> {
        return await this.dataSource.getRepository(BlogModel).save(blog);
    }


    async getById(id: string): Promise<any> {
        return await this.dataSource.getTreeRepository(BlogModel).findOne({ where: { id } });
    }

    async update(id: string, blog: BlogModel): Promise<any> {
        return await this.dataSource.getRepository(BlogModel).update(id, blog);
    }

    async delete(id: string): Promise<any> {
        return await this.dataSource.getRepository(BlogModel).delete(id);
    }

}