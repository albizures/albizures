/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
// @ts-ignore
import Hero from "../texts/hero";
// @ts-ignore
import Projects from "../texts/projects";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Listing from "./listing";
import List from "./list";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";

type PostsProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
};

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();

  return (
    <Layout>
      <section sx={{ mb: 5, p: { fontSize: [1, 2, 3], mt: 2 } }}>
        <Hero />
      </section>
      <List mb={5}>
        <Projects />
      </List>
      <Title text="Sometimes I write stuff">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          Read all posts
        </Link>
      </Title>
      <Listing mb={5} posts={posts} showTags={false} />
    </Layout>
  );
};

export default Homepage;
