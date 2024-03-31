import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { Card, ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";
import styles from '@/styles/History.module.css';

export default function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    
    if (!searchHistory) return null;
    
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <>
            {parsedHistory.length > 0 ? 
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                            {Object.keys(historyItem).map(key => (
                                <>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </>
                            ))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                :
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4> Try searching for some artwork.
                    </Card.Body>
                </Card>
            }
        </>
    );
};