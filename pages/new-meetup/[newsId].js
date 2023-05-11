import { useRouter } from "next/router";


const Detail = () => {
     const router = useRouter();
     const id = router.query.newsId;
    return(
        <h1>Detail Page : {id}</h1>
    )
}

export default Detail;