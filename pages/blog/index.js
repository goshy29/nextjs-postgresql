import Blog from "@/components/main/blog-section/Blog";
import sequelize from "@/db-connection/postgre-connection";
import BlogModel from "../api/models/blog-model";
import Head from "next/head";

function BlogPage(props) {
    return (
        <>
            <Head>
                <title>Blog</title>
                <meta name="description" content="Learn how the other people makes their own success." />
            </Head>
            <Blog blog={props.blog} error={props.error} />
        </>
    );
}

export async function getStaticProps() {

    function dateFormatter(date) {
        const formattedDate = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return formattedDate.toLocaleDateString("en-US", options);
    }

    try {
        await sequelize.authenticate();

        try {
            const blogs = await BlogModel.findAll();

            return {
                props: {
                    blog: blogs.map(b => ({
                        id: b.id.toString(),
                        title: b.title,
                        name: b.name,
                        date: dateFormatter(b.date),
                        experience: b.experience
                    })),
                    error: null
                },
                revalidate: 10
            }
        } catch (err) {
            return {
                props: {
                    blog: [],
                    error: "Failed to fetch the Blogs from the database."
                },
                revalidate: 10
            }
        }
    } catch (err) {
        return {
            props: {
                blog: [],
                error: "Could not connect to the database."
            },
            revalidate: 10
        }
    }
}

export default BlogPage;