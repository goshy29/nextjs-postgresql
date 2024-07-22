import Blog from "./models/blog-model";
import sequelize from "@/db-connection/postgre-connection";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        try {
            await sequelize.sync();
            const createdBlog = await Blog.create(data);
            res.status(201).json({ message: "Successfully saved Blog Post!", blog: createdBlog });
        } catch (error) {
            res.status(500).json({ message: "Saving Blog Post failed." });
        }
    }

    if (req.method === "DELETE") {
        const { blogId } = req.body;

        try {
            await sequelize.sync();
            const blog = await Blog.findByPk(blogId);

            if (!blog) {
                return res.status(404).json({ message: "Blog not found." });
            }

            await blog.destroy();
            res.status(200).json({ message: "Successfully deleted Blog." });
        } catch (error) {
            res.status(500).json({ message: "Deleting Blog failed." });
        }
    }
}

export default handler;