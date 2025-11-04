import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";

export default function Index() {
  return (
    <Layout>
      <BasicMeta url="/" />
      <OpenGraphMeta url="/" />
      <TwitterCardMeta url="/" />
      <div className="container">
        <div>
          <h1>
            Hi, We're Next.js & Netlify.
            <span className="accent"> @nextjs-netlify-blog</span>
          </h1>
          <span className="description">
            A blog template with Next.js and Netlify.
          </span>
          <div className="social">
            <SocialList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
