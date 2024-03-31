import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Card, Pagination, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1];

    const { data, error, isLoading } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    );

    const previousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const nextPage = () => {
        if (page < artworkList.length) setPage(page + 1);
    };

    useEffect(() => {
        if (data) {
            const results = [];
            let filteredResults = validObjectIDList.objectIDs.filter((id) =>
                data?.objectIDs?.includes(id)
            );

            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
        }
        setPage(1);
    }, [data]);

    return !isLoading ? (
        error ? (
            <Error statusCode={404} />
        ) : artworkList ? (
            <>
                {artworkList.length > 0 ? (
                    <Row className="gy=4">
                        {artworkList[page - 1].map(id => (
                            <Col lg={3} key={id}>
                                <ArtworkCard objectID={id} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4> Try searching for something
                            else
                        </Card.Body>
                    </Card>
                )}
                <br />
                {artworkList.length > 0 && (
                    <Row>
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage} />
                            </Pagination>
                        </Col>
                    </Row>
                )}
            </>
        ) : null
    ) : null;
}
