import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    
    if (!favouritesList) return null;
    
    return (
        <>
            {favouritesList.length > 0 ?
                <Row className="gy=4">
                    {favouritesList.map(id => (
                        <Col lg={3} key={id}>
                            <ArtworkCard objectID={id} />
                        </Col>
                    ))}
                </Row>
                :
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4> Try adding some new artwork to the
                        list.
                    </Card.Body>
                </Card>
            }
        </>
    );
}
