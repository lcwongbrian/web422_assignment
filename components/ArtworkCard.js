import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

export default function ArtworkCard(props) {
    const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    return !isLoading ? (
        error || !data ? (
            <Error statusCode={404} />
        ) : (
            <Card className="mb-3">
                <Card.Img
                    variant="top"
                    src={
                        data.primaryImageSmall ||
                        "https://via.placeholder.com/375x375.png?text=[+No+Photo+Provided+]"
                    }
                />
                <Card.Body>
                    <Card.Title>{data.title || "N/A"}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>
                        {data.objectDate || "N/A"}
                        <br />
                        <strong>Classification: </strong>
                        {data.classification || "N/A"}
                        <br />
                        <strong>Medium: </strong>
                        {data.medium || "N/A"}
                    </Card.Text>
                    <Link
                        href={`/artwork/${props.objectID}`}
                        passHref
                        legacyBehavior
                    >
                        <Button variant="outline-primary">ID: {props.objectID}</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    ) : null;
}
