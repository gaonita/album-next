import Head from "next/head";

const PageHead = ({page}) => (
    <Head>
        <title>Gaon Yang - {page}</title>
        <meta name="description" content="photo albums"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
    </Head>
)

export default PageHead;
